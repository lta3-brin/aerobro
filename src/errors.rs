use std::{env, str};


#[derive(Debug)]
pub enum AppErrors {
    EnvError(env::VarError),
    PahoError(paho_mqtt::Error),
    ParseUtf8Error(str::Utf8Error)
}

impl From<env::VarError> for AppErrors {
    fn from(err: env::VarError) -> Self {
        Self::EnvError(err)
    }
}

impl From<paho_mqtt::Error> for AppErrors {
    fn from(err: paho_mqtt::Error) -> Self {
        Self::PahoError(err)
    }
}

impl From<str::Utf8Error> for AppErrors {
    fn from(err: str::Utf8Error) -> Self {
        Self::ParseUtf8Error(err)
    }
}
