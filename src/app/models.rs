use std::{env, str, io};


#[derive(Debug, Clone)]
pub struct AppConfigs {
    pub addr: String,
    pub user: String,
    pub password: String,
    pub topic: String,
    pub appport: String,
    pub dbhost: String,
    pub dbport: String,
    pub dbname: String,
    pub dbuser: String,
    pub dbpwd: String
}

#[derive(Debug)]
pub struct DbConn;

#[derive(Debug)]
pub enum AppErrors {
    IoError(io::Error),
    EnvError(env::VarError),
    PahoError(paho_mqtt::Error),
    ParseUtf8Error(str::Utf8Error),
    ReqwestError(reqwest::Error),
    SqlxError(sqlx::Error)
}
