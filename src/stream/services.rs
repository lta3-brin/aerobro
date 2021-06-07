use std::pin::Pin;
use std::sync::Mutex;
use actix_web::Error;
use std::time::Duration;
use tokio::sync::mpsc::channel;
use std::task::{Context, Poll};
use futures::{Stream, StreamExt};
use actix_web::web::{Bytes, Data};
use actix_web::rt::{spawn, time::{interval_at, Instant}};
use crate::app::helpers::get_configs;
use crate::stream::{
    helpers::run_mqtt,
    models::{Client, Broadcasters}
};


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

impl Broadcasters {
    fn new() -> Self {
        Broadcasters { producers: Vec::new() }
    }

    pub fn create() -> Data<Mutex<Self>> {
        let data = Data::new(Mutex::new(
            Broadcasters::new()
        ));

        Broadcasters::spawn_ping(data.clone());
        Broadcasters::spawn_mqtt("bh77");

        data
    }

    fn spawn_ping(data: Data<Mutex<Self>>) {
        spawn(async move {
            let mut task = interval_at(
                Instant::now(),
                Duration::from_secs(5)
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

    fn spawn_mqtt(code: &'static str) {
        spawn(async move {
            match get_configs() {
                Ok(conf) => {
                    match run_mqtt(code, conf) {
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
