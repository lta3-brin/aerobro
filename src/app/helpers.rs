use std::env;
use crate::app::models::{AppConfigs, AppErrors};


pub fn get_configs() -> Result<AppConfigs, AppErrors> {
    let addr = env::var("MQTT_ADDR")?;
    let user = env::var("MQTT_USER")?;
    let password = env::var("MQTT_PWD")?;
    let topic = env::var("MSG_TOPIC")?;
    let appport = env::var("APP_PORT")?;
    let dburl = env::var("DATABASE_URL")?;
    let configs = AppConfigs::new(
        addr, user, password, topic, appport, dburl
    );

    Ok(configs)
}
