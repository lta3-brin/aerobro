use serde::{Serialize};


#[derive(Debug, Serialize)]
pub struct UmpanBalik<T> {
    sukses: bool,
    pesan: &'static str,
    hasil: T,
}

impl<T> UmpanBalik<T> {
    pub fn new(sukses: bool, pesan: &'static str, hasil: T) -> Self {
        Self { sukses, pesan, hasil }
    }
}
