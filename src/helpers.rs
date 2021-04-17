use paho_mqtt as mqtt;
use std::time::Duration;
use actix_web_actors::ws;
use actix::{Actor, StreamHandler};
use crate::errors::AppErrors;
use crate::configs::{AppConfigs, get_configs};


// Define HTTP actor
pub struct AerobroWs;

impl Actor for AerobroWs {
    type Context = ws::WebsocketContext<Self>;
}

impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for AerobroWs {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(ws::Message::Close(message)) => {
                ctx.close(message);
            }
            _ => ()
        }
    }

    fn started(&mut self, ctx: &mut Self::Context) {
        match get_configs() {
            Ok(configs) => {
                match run_mqtt(configs, ctx) {
                    Ok(_) => (),
                    Err(err) => eprintln!("Err: {:?}", err)
                }
            }
            Err(err) => eprintln!("Err: {:?}", err)
        }
    }
}


pub fn run_mqtt(
    configs: AppConfigs,
    ctx: &mut ws::WebsocketContext<AerobroWs>
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

    for rx in rx.iter() {
        if let Some(msg) = rx {
            let payload = msg.payload();
            let _msg = std::str::from_utf8(payload)?;

            ctx.text("Websocket connected.")
        }
    }

    Ok(())
}
