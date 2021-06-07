use std::{env, str, io};
use crate::app::models::{AppErrors, AppConfigs};

impl From<sqlx::Error> for AppErrors {
    fn from(err: sqlx::Error) -> Self {
        Self::SqlxError(err)
    }
}

impl From<reqwest::Error> for AppErrors {
    fn from(err: reqwest::Error) -> Self {
        Self::ReqwestError(err)
    }
}

impl From<str::Utf8Error> for AppErrors {
    fn from(err: str::Utf8Error) -> Self {
        Self::ParseUtf8Error(err)
    }
}

impl From<paho_mqtt::Error> for AppErrors {
    fn from(err: paho_mqtt::Error) -> Self {
        Self::PahoError(err)
    }
}

impl From<env::VarError> for AppErrors {
    fn from(err: env::VarError) -> Self {
        Self::EnvError(err)
    }
}

impl From<io::Error> for AppErrors {
    fn from(err: io::Error) -> Self {
        Self::IoError(err)
    }
}

impl AppConfigs {
    pub fn new(addr: String, user: String,
           password: String, topic: String,
           appport: String
    ) -> Self {
        Self { addr, user, password, topic, appport }
    }

    pub fn get_addr(&self) -> String {
        self.addr.clone()
    }

    pub fn get_user(&self) -> String {
        self.user.clone()
    }

    pub fn get_password(&self) -> String {
        self.password.clone()
    }

    pub fn get_topic(&self) -> String {
        self.topic.clone()
    }

    pub fn get_app_port(&self) -> String {
        self.appport.clone()
    }
}
