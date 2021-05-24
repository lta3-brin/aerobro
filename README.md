# aerobro
Repositori pengembangan riset aerobro. Selama pengembangan dan produksi aplikasi, perlu mempersiapkan 
_environment variable_ sebagai berikut:

```
MQTT_ADDR=tcp://localhost:1883       #main
MQTT_USER=coba                       #main
MQTT_PWD=rahasia                     #main
MSG_TOPIC=topik                      #main
APP_PORT=3000                        #main
STREAM_ADDRESS=localhost:3000        #ui
ACC_THRESHOLD_MIN=0.4                #ui,proc
ACC_THRESHOLD_MAX=0.7                #ui,proc
STRAIN_THRESHOLD_MIN=0.05            #ui,proc
STRAIN_THRESHOLD_MAX=0.07            #ui,proc
DISPL_THRESHOLD_MIN=3.0              #ui,proc
DISPL_THRESHOLD_MAX=3.5              #ui,proc
REPO_NAME=aerobro                    #ui
DB_HOST=localhost                    #proc
DB_PORT=5432                         #proc
DB_NAME=dbname                       #proc
DB_USER=dbuser                       #proc
DB_PASSWORD=dbpassword               #proc
```
