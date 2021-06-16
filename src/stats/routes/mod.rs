mod daily;
mod services;

use actix_web::web;
use crate::stats::routes::daily::daily_sensor;


pub fn stats_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(daily_sensor);
}
