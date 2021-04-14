use std::{env, str, io};
use crossbeam_channel::SendError;


#[derive(Debug)]
pub enum AppErrors {
    IoError(io::Error),
    EnvError(env::VarError),
    PahoError(paho_mqtt::Error),
    ParseUtf8Error(str::Utf8Error),
    ChannelSendError(SendError<String>)
}

impl From<io::Error> for AppErrors {
    fn from(err: io::Error) -> Self {
        Self::IoError(err)
    }
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

impl From<SendError<String>> for AppErrors {
    fn from(err: SendError<String>) -> Self {
        Self::ChannelSendError(err)
    }
}