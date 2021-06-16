use crate::stats::model::Sensor;

impl Sensor {
    pub fn new(id: String, date: String, status: i32, count: i32) -> Self {
        Self { id, date, status, count }
    }
}
