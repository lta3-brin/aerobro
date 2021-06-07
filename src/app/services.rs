use sqlx::PgPool;
use std::{env, str, io};
use crate::app::models::{AppErrors, AppConfigs, DbConn};
use crate::app::helpers::get_configs;

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
           appport: String, dbhost: String,
           dbport: String, dbname: String,
           dbuser: String, dbpwd: String
    ) -> Self {
        Self { addr, user, password, topic, appport,
            dbhost, dbport, dbname, dbuser, dbpwd
        }
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

    pub fn get_dbhost(&self) -> String {
        self.dbhost.clone()
    }

    pub fn get_dbport(&self) -> String {
        self.dbport.clone()
    }

    pub fn get_dbname(&self) -> String {
        self.dbname.clone()
    }

    pub fn get_dbuser(&self) -> String {
        self.dbuser.clone()
    }

    pub fn get_dbpwd(&self) -> String {
        self.dbpwd.clone()
    }
}

impl DbConn {
    pub async fn create() -> Result<PgPool, AppErrors> {
        let config = get_configs()?;
        let addr = format!(
            "postgres://{}:{}@{}:{}/{}",
            config.get_dbuser(),
            config.get_dbpwd(),
            config.get_dbhost(),
            config.get_dbport(),
            config.get_dbname()
        );
        let pool = PgPool::new(addr.as_str()).await?;

        Ok(pool)
    }
}
