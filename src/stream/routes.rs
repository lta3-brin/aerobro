use std::sync::Mutex;
use actix_web::web::Data;
use actix_web::{get, post, Responder, HttpResponse, web};
use crate::stream::models::{Broadcasters, Sensor};


pub fn stream_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(index)
        .service(bh77)
        .service(bh77_broadcast);
}

#[get("/")]
async fn index() -> impl Responder {
    format!("Halaman ini dikosongkan.")
}

#[get("/stream")]
async fn bh77(data: Data<Mutex<Broadcasters>>) -> impl Responder {
    match data.lock() {
        Ok(mut r) => {
            HttpResponse::Ok()
                .header("content-type", "text/event-stream")
                .streaming(r.new_client())
        }
        Err(err) => {
            HttpResponse::BadRequest().body(err.to_string())
        }
    }
}

#[post("/stream")]
async fn bh77_broadcast(
    msg: web::Json<Sensor>,
    data: Data<Mutex<Broadcasters>>,
) -> impl Responder {
    match data.lock() {
        Ok(dt) => {
            dt.send_sensor(msg.0.value.as_str());

            HttpResponse::Ok().body("Data sensor dikirimkan")
        }
        Err(e) => {
            HttpResponse::BadGateway().body(
                format!("{}", e)
            )
        }
    }
}
