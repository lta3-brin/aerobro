mod app;
mod stream;
mod stats;

use dotenv::dotenv;
use actix_cors::Cors;
use actix_web::{App, HttpServer};
use crate::app::{
    helpers,
    models::{AppErrors, DbConn}
};
use crate::stream::{
    models::Broadcasters,
    routes::stream_routes,
};
use crate::stats::routes::stats_routes;


#[actix_web::main]
async fn main() -> Result<(), AppErrors> {
    dotenv().ok();

    let configs = helpers::get_configs()?;
    let data = Broadcasters::create();
    let db = DbConn::create().await?;
    let server = HttpServer::new(move || {
        let cors = Cors::default().allow_any_origin().allow_any_header();

        App::new()
            .wrap(cors)
            .data(db.clone())
            .app_data(data.clone())
            .configure(stream_routes)
            .configure(stats_routes)
    });

    println!("{}", format!("Menjalankan servis Aerobro di 0.0.0.0:{}", configs.get_app_port()));
    server.bind(format!("0.0.0.0:{}", configs.get_app_port()))?
        .run()
        .await?;

    Ok(())
}
