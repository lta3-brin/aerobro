use std::{env, str, io};


#[derive(Debug, Clone)]
pub struct AppConfigs {
    pub addr: String,
    pub user: String,
    pub password: String,
    pub topic: String,
    pub appport: String
}

#[derive(Debug)]
pub enum AppErrors {
    IoError(io::Error),
    EnvError(env::VarError),
    PahoError(paho_mqtt::Error),
    ParseUtf8Error(str::Utf8Error),
    ReqwestError(reqwest::Error),
    SqlxError(sqlx::Error)
}
