use sqlx::PgPool;
use std::{env, str, io};
use actix_web::{ResponseError, HttpResponse};
use actix_web::http::{StatusCode, header};
use actix_web::dev::HttpResponseBuilder;
use crate::app::dto::UmpanBalik;
use crate::app::helpers::get_configs;
use crate::app::models::{AppErrors, AppConfigs, DbConn};

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
           appport: String, dburl: String
    ) -> Self {
        Self { addr, user, password, topic, appport, dburl }
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

    pub fn get_dburl(&self) -> String {
        self.dburl.clone()
    }
}

impl DbConn {
    pub async fn create() -> Result<PgPool, AppErrors> {
        let config = get_configs()?;
        let addr = config.get_dburl();
        let pool = PgPool::new(addr.as_str()).await?;

        Ok(pool)
    }
}

impl ResponseError for AppErrors {
    fn status_code(&self) -> StatusCode {
        match *self {
            _ => StatusCode::INTERNAL_SERVER_ERROR,
        }
    }

    fn error_response(&self) -> HttpResponse {
        let res = UmpanBalik::new(
            false,
            "Terjadi kesalahan yang perlu diperhatikan",
            self.to_string()
        );

        HttpResponseBuilder::new(self.status_code())
            .set_header(header::CONTENT_TYPE, "application/json")
            .json(res)
    }
}
