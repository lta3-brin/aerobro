mod configs;
mod errors;

use dotenv::dotenv;
use paho_mqtt as mqtt;
use std::time::Duration;
use crate::errors::AppErrors;
use crate::configs::get_configs;


fn main() -> Result<(), AppErrors> {
    dotenv().ok();

    let configs = get_configs()?;
    let client_opts = mqtt::CreateOptionsBuilder::new()
        .server_uri(configs.get_addr())
        .client_id("aerobro_mqtt_subscriber")
        .finalize();

    let mut client = mqtt::Client::new(client_opts)?;
    let rx = client.start_consuming();

    let lwt = mqtt::MessageBuilder::new()
        .topic("aerobro_topic")
        .payload("Consumer lost connection")
        .finalize();

    let conn_opts = mqtt::ConnectOptionsBuilder::new()
        .keep_alive_interval(Duration::from_secs(20))
        .clean_session(false)
        .will_message(lwt)
        .user_name(configs.get_user())
        .password(configs.get_password())
        .finalize();

    client.connect(conn_opts)?;
    client.subscribe(configs.get_topic().as_str(), 1)?;

    println!("Menjalankan konversi protokol...");
    for rx in rx.iter() {
        if let Some(msg) = rx {
            let payload = msg.payload();
            println!("{}", std::str::from_utf8(payload)?)
        }
    }

    Ok(())
}

