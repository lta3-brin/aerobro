use serde::Deserialize;
use actix_web::web::Bytes;
use tokio::sync::mpsc::{Receiver, Sender};

#[derive(Debug, Deserialize)]
pub struct Sensor { pub value: String }

pub struct Client(pub Receiver<Bytes>);

pub struct Broadcasters {
    pub producers: Vec<Sender<Bytes>>
}
