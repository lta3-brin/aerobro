use paho_mqtt as mqtt;
use std::time::Duration;
use crossbeam_channel::Sender;
use crate::errors::AppErrors;
use crate::configs::AppConfigs;


pub fn run_mqtt(
    configs: AppConfigs,
    s: Sender<String>
) -> Result<(), AppErrors> {
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

    println!("Menjalankan socket.");
    for rx in rx.iter() {
        if let Some(msg) = rx {
            let payload = msg.payload();
            let msg = std::str::from_utf8(payload)?;

            s.send(msg.to_string())?;
        }
    }

    Ok(())
}
