use serde::Serialize;
use sqlx::FromRow;


#[derive(Debug, Serialize, Hash, Eq, PartialEq, FromRow)]
pub struct Sensor {
    pub id: String,
    pub date: String,
    pub status: i32,
    pub count: i32
}
