mod configs;
mod errors;
mod handlers;

use dotenv::dotenv;
use std::thread::spawn;
use std::net::TcpListener;
use crossbeam_channel::unbounded;
use tungstenite::{accept, Message};
use crate::errors::AppErrors;
use crate::configs::get_configs;
use crate::handlers::run_mqtt;


fn main() -> Result<(), AppErrors> {
    dotenv().ok();

    let (s, r) = unbounded::<String>();
    let configs = get_configs()?;
    let server = TcpListener::bind(configs.get_websocket_addr())?;

    spawn(move || {
        run_mqtt(configs, s)
    });

    for stream in server.incoming() {
        let rclone = r.clone();

        spawn(move || {
            let mut websocket = accept(stream.unwrap()).unwrap();

            loop {
                let message = rclone.recv().unwrap();
                websocket.write_message(Message::from(message)).unwrap();
            }
        });
    }

    Ok(())
}
