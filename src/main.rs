mod configs;
mod errors;
mod handlers;

use std::fs::File;
use std::io::Read;
use std::sync::Arc;
use dotenv::dotenv;
use std::thread::spawn;
use tungstenite::accept;
use std::net::TcpListener;
use crossbeam_channel::unbounded;
use native_tls::{Identity, TlsAcceptor};
use crate::errors::AppErrors;
use crate::configs::get_configs;
use crate::handlers::{run_mqtt, send_message};


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
                match send_message(rclone.clone(), &mut websocket) {
                    Ok(_) => (),
                    Err(err) => eprintln!("{:?}", err)
                }
            }
        });
    }

    Ok(())
}
