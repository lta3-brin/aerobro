mod configs;
mod errors;
mod helpers;
mod handlers;
mod models;

use dotenv::dotenv;
use actix_cors::Cors;
use actix_web::{App, HttpServer};
use crate::handlers::{index, bh77, bh77_broadcast};
use crate::errors::AppErrors;
use crate::configs::get_configs;
use crate::models::Broadcasters;


#[actix_web::main]
async fn main() -> Result<(), AppErrors> {
    dotenv().ok();

    let configs = get_configs()?;
    let data = Broadcasters::create();
    let server = HttpServer::new(move || {
        let cors = Cors::default().allow_any_origin().allow_any_header();

        App::new()
            .wrap(cors)
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
