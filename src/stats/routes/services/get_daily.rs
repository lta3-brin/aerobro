use sqlx::PgPool;
// use std::collections::HashMap;
use crate::stats::model::Sensor;
use crate::app::models::AppErrors;

impl Sensor {
    pub async fn all_sensor(pool: &PgPool) -> Result<Vec<Sensor>, AppErrors> {
        // let all: HashMap<&str, Vec<Sensor>> = HashMap::new();
        let mut all_acc: Vec<Sensor> = Vec::new();
        let rows = sqlx::query!("SELECT * FROM acc_daily").fetch_all(pool).await?;

        for acc in rows {
            all_acc.push(Sensor::new(
                acc.id.unwrap().to_string(), acc.date.unwrap(), acc.status.unwrap(), acc.count.unwrap()
            ));
        }

        Ok(all_acc)
    }
}
