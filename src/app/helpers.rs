use std::env;
use crate::app::models::{AppConfigs, AppErrors};


pub fn get_configs() -> Result<AppConfigs, AppErrors> {
    let addr = env::var("MQTT_ADDR")?;
    let user = env::var("MQTT_USER")?;
    let password = env::var("MQTT_PWD")?;
    let topic = env::var("MSG_TOPIC")?;
    let appport = env::var("APP_PORT")?;
    let dbhost = env::var("DB_HOST")?;
    let dbport = env::var("DB_PORT")?;
    let dbname = env::var("DB_NAME")?;
    let dbuser = env::var("DB_USER")?;
    let dbpwd = env::var("DB_PASSWORD")?;
    let configs = AppConfigs::new(
        addr, user, password, topic, appport,
        dbhost, dbport, dbname, dbuser, dbpwd
    );

    Ok(configs)
}
