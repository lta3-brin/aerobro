use actix_web_actors::ws;
use actix_web::{get, Responder, HttpRequest, web};
use crate::helpers::AerobroWs;

#[get("/")]
pub async fn index() -> impl Responder {
    format!("Halaman ini dikosongkan.")
}

#[get("/aerobrows")]
pub async fn aerobrows(req: HttpRequest, stream: web::Payload) -> impl Responder {
    let resp = ws::start(AerobroWs {}, &req, stream);

    resp
}
