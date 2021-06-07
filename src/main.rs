mod app;
mod stream;

use sqlx::PgPool;
use dotenv::dotenv;
use actix_cors::Cors;
use actix_web::{App, HttpServer};
use crate::app::{helpers, models::AppErrors};
use crate::stream::{
    models::Broadcasters,
    routes::{bh77, bh77_broadcast, index},
};


#[actix_web::main]
async fn main() -> Result<(), AppErrors> {
    dotenv().ok();

    let configs = helpers::get_configs()?;
    let data = Broadcasters::create();
    let db = PgPool::new(
        "postgres://aerobro:aerobro.pwd@localhost/aerobro"
    ).await?;
    let server = HttpServer::new(move || {
        let cors = Cors::default().allow_any_origin().allow_any_header();

        App::new()
            .wrap(cors)
            .data(db.clone())
            .app_data(data.clone())
            .service(index)
            .service(bh77)
            .service(bh77_broadcast)
    });

    println!("{}", format!("Menjalankan servis Aerobro di 0.0.0.0:{}", configs.get_app_port()));
    server.bind(format!("0.0.0.0:{}", configs.get_app_port()))?
        .run()
        .await?;

    Ok(())
}
