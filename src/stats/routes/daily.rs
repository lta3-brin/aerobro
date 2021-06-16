use sqlx::PgPool;
use actix_web::{get, web, HttpResponse};
use crate::stats::model::Sensor;
use crate::app::models::AppErrors;


#[get("/")]
pub async fn daily_sensor(pool: web::Data<PgPool>) -> Result<HttpResponse, AppErrors> {
    let data = Sensor::all_sensor(pool.get_ref()).await?;

    Ok(HttpResponse::Ok().json(data))
}
