from django.db import models


class RtuInfo(models.Model):
    # Field name made lowercase.
    id = models.IntegerField(db_column='ID', primary_key=True)

    # Field name made lowercase.
    code = models.CharField(db_column='CODE', max_length=50, blank=True, null=True)

    # Field name made lowercase.
    name = models.CharField(db_column='NAME', max_length=100, blank=True, null=True)

    # Field name made lowercase.
    location = models.CharField(db_column='LOCATION', max_length=200, blank=True, null=True)

    # Field name made lowercase.
    mac_adr = models.CharField(db_column='MAC_ADR', max_length=100, blank=True, null=True)

    # Field name made lowercase.
    pi_code = models.CharField(db_column='PI_CODE', max_length=100, blank=True, null=True)

    # Field name made lowercase.
    description1 = models.CharField(db_column='DESCRIPTION1', max_length=200, blank=True, null=True)

    # Field name made lowercase.
    description2 = models.CharField(db_column='DESCRIPTION2', max_length=200, blank=True, null=True)

    # Field name made lowercase.
    ip_adr = models.CharField(db_column='IP_ADR', max_length=200, blank=True, null=True)

    # Field name made lowercase.
    loginterval = models.IntegerField(db_column='LogInterval', blank=True, null=True)

    # Field name made lowercase.
    loginterval2 = models.IntegerField(db_column='LogInterval2', blank=True, null=True)

    # Field name made lowercase.
    sensorinterval = models.IntegerField(db_column='SensorInterval', blank=True, null=True)

    # Field name made lowercase.
    waitsms = models.IntegerField(db_column='WaitSMS', blank=True, null=True)

    # Field name made lowercase.
    sendstatus = models.IntegerField(db_column='SendStatus', blank=True, null=True)

    # Field name made lowercase.
    detik = models.IntegerField(db_column='Detik', blank=True, null=True)

    # Field name made lowercase.
    menit = models.IntegerField(db_column='Menit', blank=True, null=True)

    # Field name made lowercase.
    jam = models.IntegerField(db_column='Jam', blank=True, null=True)

    # Field name made lowercase.
    hari = models.IntegerField(db_column='Hari', blank=True, null=True)

    # Field name made lowercase.
    tanggal = models.IntegerField(db_column='Tanggal', blank=True, null=True)

    # Field name made lowercase.
    bulan = models.IntegerField(db_column='Bulan', blank=True, null=True)

    # Field name made lowercase.
    tahun = models.IntegerField(db_column='Tahun', blank=True, null=True)

    # Field name made lowercase.
    prevsensorconn = models.CharField(db_column='PrevSensorConn', max_length=40, blank=True, null=True)

    # Field name made lowercase.
    connstatus = models.CharField(db_column='ConnStatus', max_length=20, blank=True, null=True)

    # Field name made lowercase.
    waitsmsresponse = models.IntegerField(db_column='WaitSMSresponse', blank=True, null=True)

    # Field name made lowercase.
    nextdata = models.IntegerField(db_column='NextData', blank=True, null=True)

    # Field name made lowercase.
    nextsensor = models.IntegerField(db_column='NextSensor', blank=True, null=True)

    # Field name made lowercase.
    readposper = models.IntegerField(db_column='ReadPosPer', blank=True, null=True)

    # Field name made lowercase.
    writeposper = models.IntegerField(db_column='WritePosPer', blank=True, null=True)

    # Field name made lowercase.
    datasetper = models.IntegerField(db_column='DataSetPer', blank=True, null=True)

    # Field name made lowercase.
    rwposperhb = models.IntegerField(db_column='RWPosPerHB', blank=True, null=True)

    # Field name made lowercase.
    readposews = models.IntegerField(db_column='ReadPosEWS', blank=True, null=True)

    # Field name made lowercase.
    writeposews = models.IntegerField(db_column='WritePosEWS', blank=True, null=True)

    # Field name made lowercase.
    balancevoucher = models.CharField(db_column='BalanceVoucher', max_length=500, blank=True, null=True)

    # Field name made lowercase.
    readposper2 = models.IntegerField(db_column='ReadPosPer2', blank=True, null=True)

    # Field name made lowercase.
    writeposper2 = models.IntegerField(db_column='WritePosPer2', blank=True, null=True)

    # Field name made lowercase.
    datasetper2 = models.IntegerField(db_column='DataSetPer2', blank=True, null=True)

    # Field name made lowercase.
    rwposperhb2 = models.IntegerField(db_column='RWPosPerHB2', blank=True, null=True)

    # Field name made lowercase.
    host_ip = models.CharField(db_column='HOST_IP', max_length=100, blank=True, null=True)

    # Field name made lowercase.
    autoupd_tr = models.IntegerField(db_column='AutoUpd_TR', blank=True, null=True)

    # Field name made lowercase.
    autoupd_nr = models.IntegerField(db_column='AutoUpd_NR', blank=True, null=True)

    # Field name made lowercase.
    autoupd_val = models.IntegerField(db_column='AutoUpd_VAL', blank=True, null=True)

    # Field name made lowercase.
    autoupdate = models.CharField(db_column='AutoUpdate', max_length=1)

    # Field name made lowercase.
    autoread_tr = models.IntegerField(db_column='AutoRead_TR', blank=True, null=True)

    # Field name made lowercase.
    autoreadstatus = models.CharField(db_column='AutoReadStatus', max_length=1)

    # Field name made lowercase.
    autowritepar = models.CharField(db_column='AutoWritePar', max_length=1)

    # Field name made lowercase.
    refvoltage = models.IntegerField(db_column='RefVoltage', blank=True, null=True)

    # Field name made lowercase.
    shuntresistor = models.IntegerField(db_column='ShuntResistor', blank=True, null=True)

    # Field name made lowercase.
    offsettrd = models.IntegerField(db_column='OffsetTRD', blank=True, null=True)

    # Field name made lowercase.
    slopetrd = models.IntegerField(db_column='SlopeTRD', blank=True, null=True)

    # Field name made lowercase.
    parsing = models.CharField(db_column='Parsing', max_length=1)

    # Field name made lowercase.
    ref_point = models.IntegerField(db_column='REF_POINT', blank=True, null=True)

    # Field name made lowercase.
    max_depth = models.IntegerField(db_column='MAX_DEPTH', blank=True, null=True)

    # Field name made lowercase.
    sensor_dist = models.IntegerField(db_column='SENSOR_DIST', blank=True, null=True)

    # Field name made lowercase.
    shuntresistor2 = models.IntegerField(db_column='ShuntResistor2', blank=True, null=True)

    # Field name made lowercase.
    offsettrd2 = models.IntegerField(db_column='OffsetTRD2', blank=True, null=True)

    # Field name made lowercase.
    slopetrd2 = models.IntegerField(db_column='SlopeTRD2', blank=True, null=True)

    # Field name made lowercase.
    ref_point2 = models.IntegerField(db_column='REF_POINT2', blank=True, null=True)

    # Field name made lowercase.
    max_depth2 = models.IntegerField(db_column='MAX_DEPTH2', blank=True, null=True)

    # Field name made lowercase.
    sensor_dist2 = models.IntegerField(db_column='SENSOR_DIST2', blank=True, null=True)

    # Field name made lowercase.
    shuntresistor3 = models.IntegerField(db_column='ShuntResistor3', blank=True, null=True)

    # Field name made lowercase.
    offsettrd3 = models.IntegerField(db_column='OffsetTRD3', blank=True, null=True)

    # Field name made lowercase.
    slopetrd3 = models.IntegerField(db_column='SlopeTRD3', blank=True, null=True)

    # Field name made lowercase.
    ref_point3 = models.IntegerField(db_column='REF_POINT3', blank=True, null=True)

    # Field name made lowercase.
    max_depth3 = models.IntegerField(db_column='MAX_DEPTH3', blank=True, null=True)

    # Field name made lowercase.
    sensor_dist3 = models.IntegerField(db_column='SENSOR_DIST3', blank=True, null=True)

    # Field name made lowercase.
    shuntresistor4 = models.IntegerField(db_column='ShuntResistor4', blank=True, null=True)

    # Field name made lowercase.
    offsettrd4 = models.IntegerField(db_column='OffsetTRD4', blank=True, null=True)

    # Field name made lowercase.
    slopetrd4 = models.IntegerField(db_column='SlopeTRD4', blank=True, null=True)

    # Field name made lowercase.
    ref_point4 = models.IntegerField(db_column='REF_POINT4', blank=True, null=True)

    # Field name made lowercase.
    max_depth4 = models.IntegerField(db_column='MAX_DEPTH4', blank=True, null=True)

    # Field name made lowercase.
    sensor_dist4 = models.IntegerField(db_column='SENSOR_DIST4', blank=True, null=True)

    # Field name made lowercase.
    refvoltage2 = models.IntegerField(db_column='RefVoltage2', blank=True, null=True)

    class Meta:
        db_table = 'rtu_info'
