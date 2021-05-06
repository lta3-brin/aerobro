use std::pin::Pin;
use actix_web::Error;
use std::sync::Mutex;
use serde::Deserialize;
use std::time::Duration;
use actix_web::rt::spawn;
use std::task::{Context, Poll};
use futures::{Stream, StreamExt};
use actix_web::web::{Bytes, Data};
use actix_web::rt::time::{interval_at, Instant};
use tokio::sync::mpsc::{Receiver, Sender, channel};
use crate::helpers::run_mqtt;
use crate::configs::get_configs;


#[derive(Debug, Deserialize)]
pub struct Sensor { pub value: String }

pub struct Client(Receiver<Bytes>);

impl Stream for Client {
    type Item = Result<Bytes, Error>;

    fn poll_next(
        mut self: Pin<&mut Self>,
        cx: &mut Context<'_>,
    ) -> Poll<Option<Self::Item>> {
        match Pin::new(&mut self.0).poll_next(cx) {
            Poll::Ready(Some(v)) => Poll::Ready(Some(Ok(v))),
            Poll::Ready(None) => Poll::Ready(None),
            Poll::Pending => Poll::Pending,
        }
    }
}

pub struct Broadcasters {
    producers: Vec<Sender<Bytes>>
}

impl Broadcasters {
    fn new() -> Self {
        Broadcasters { producers: Vec::new() }
    }

    pub fn create() -> Data<Mutex<Self>> {
        let data = Data::new(Mutex::new(
            Broadcasters::new()
        ));

        Broadcasters::spawn_ping(data.clone());
        Broadcasters::spawn_mqtt(data.clone());

        data
    }

    fn spawn_ping(data: Data<Mutex<Self>>) {
        spawn(async move {
            let mut task = interval_at(
                Instant::now(),
                Duration::from_secs(10)
            );

            while task.next().await.is_some() {
                match data.lock() {
                    Ok(mut dt) => dt.remove_stale_producers(),
                    Err(err) => eprintln!("{:?}", err)
                }
            }
        })
    }

    fn remove_stale_producers(&mut self) {
        let mut new_producers = Vec::new();

        for producer in self.producers.iter() {
            let result = producer.clone().try_send(
                Bytes::from("")
            );

            if result.is_ok() {
                new_producers.push(producer.clone());
            }
        }

        self.producers = new_producers;
    }

    fn spawn_mqtt(data: Data<Mutex<Self>>) {
        spawn(async move {
            match get_configs() {
                Ok(conf) => {
                    match run_mqtt(data, conf) {
                        Ok(_) => (),
                        Err(e) => eprintln!("{:?}", e)
                    }
                }
                Err(e) => eprintln!("{:?}", e)
            }
        })
    }

    pub fn new_client(&mut self) -> Client {
        let (s, r) = channel(100);

        self.producers.push(s.clone());

        Client(r)
    }

    pub fn send_sensor(&self, msg: &str) {
        let msg = Bytes::from(["data: ", msg, "\n\n"].concat());

        for producers in self.producers.iter() {
            match producers.clone().try_send(msg.clone()) {
                Ok(_) => (),
                Err(e) => eprintln!("{}", e)
            }
        }
    }
}
