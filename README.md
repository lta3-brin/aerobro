# aerobro
Repositori pengembangan riset aerobro. Selama pengembangan dan produksi aplikasi, perlu mempersiapkan 
_environment variable_ sebagai berikut:

```
DEBUG=dev                                               #main
SECRET_KEY=s3cr3t                                       #main
DB_USERNAME=user                                        #main
DB_PASSWORD=p4ssword                                    #main
DB_NAME=dbname                                          #main
DB_HOST=localhost                                       #main
DB_PORT=3306                                            #main
REPO_NAME=aerobro                                       #ui
ACC_THRESHOLD_MIN=0.4                                   #ui,proc
ACC_THRESHOLD_MAX=0.7                                   #ui,proc
STRAIN_THRESHOLD_MIN=0.05                               #ui,proc
STRAIN_THRESHOLD_MAX=0.07                               #ui,proc
DISPL_THRESHOLD_MIN=3.0                                 #ui,proc
DISPL_THRESHOLD_MAX=3.5                                 #ui,proc
DB_HOST=localhost                                       #proc
DB_PORT=5432                                            #proc
DB_NAME=dbname                                          #proc
DB_USER=dbuser                                          #proc
DB_PASSWORD=dbpassword                                  #proc
```
