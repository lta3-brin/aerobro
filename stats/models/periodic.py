from django.db import models

from stats.models.rtu import RtuInfo


class Periodicdata2(models.Model):
    # Field name made lowercase.
    id = models.IntegerField(db_column='ID', primary_key=True)

    # Field name made lowercase.
    station = models.ForeignKey(RtuInfo, db_column='Station', on_delete=models.CASCADE)

    # Field name made lowercase.
    logdate = models.DateTimeField(db_column='logDate', blank=True, null=True)

    # Field name made lowercase.
    logtime = models.DateTimeField(db_column='logTime', blank=True, null=True)

    # Field name made lowercase.
    intv = models.IntegerField(db_column='Intv', blank=True, null=True)

    # Field name made lowercase.
    pwr = models.IntegerField(db_column='PWR', blank=True, null=True)

    # Field name made lowercase.
    memory = models.IntegerField(db_column='Memory', blank=True, null=True)

    # Field name made lowercase.
    logdt = models.DateTimeField(db_column='logDT', blank=True, null=True)

    # Field name made lowercase.
    ai22_1 = models.IntegerField(db_column='AI22_1', blank=True, null=True)

    # Field name made lowercase.
    refvoltage = models.IntegerField(db_column='RefVoltage', blank=True, null=True)

    # Field name made lowercase.
    shuntresistor = models.IntegerField(db_column='ShuntResistor', blank=True, null=True)

    # Field name made lowercase.
    offsettrd = models.IntegerField(db_column='OffsetTRD', blank=True, null=True)

    # Field name made lowercase.
    slopetrd = models.IntegerField(db_column='SlopeTRD', blank=True, null=True)

    # Field name made lowercase.
    sensor_dist = models.IntegerField(db_column='SENSOR_DIST', blank=True, null=True)

    # Field name made lowercase.
    receiveddt = models.DateTimeField(db_column='receivedDT', blank=True, null=True)

    # Field name made lowercase.
    ai22_2 = models.IntegerField(db_column='AI22_2', blank=True, null=True)

    # Field name made lowercase.
    shuntresistor2 = models.IntegerField(db_column='ShuntResistor2', blank=True, null=True)

    # Field name made lowercase.
    offsettrd2 = models.IntegerField(db_column='OffsetTRD2', blank=True, null=True)

    # Field name made lowercase.
    slopetrd2 = models.IntegerField(db_column='SlopeTRD2', blank=True, null=True)

    # Field name made lowercase.
    sensor_dist2 = models.IntegerField(db_column='SENSOR_DIST2', blank=True, null=True)

    # Field name made lowercase.
    ai22_3 = models.IntegerField(db_column='AI22_3', blank=True, null=True)

    # Field name made lowercase.
    shuntresistor3 = models.IntegerField(db_column='ShuntResistor3', blank=True, null=True)

    # Field name made lowercase.
    offsettrd3 = models.IntegerField(db_column='OffsetTRD3', blank=True, null=True)

    # Field name made lowercase.
    slopetrd3 = models.IntegerField(db_column='SlopeTRD3', blank=True, null=True)

    # Field name made lowercase.
    sensor_dist3 = models.IntegerField(db_column='SENSOR_DIST3', blank=True, null=True)

    # Field name made lowercase.
    ai22_4 = models.IntegerField(db_column='AI22_4', blank=True, null=True)

    # Field name made lowercase.
    shuntresistor4 = models.IntegerField(db_column='ShuntResistor4', blank=True, null=True)

    # Field name made lowercase.
    offsettrd4 = models.IntegerField(db_column='OffsetTRD4', blank=True, null=True)

    # Field name made lowercase.
    slopetrd4 = models.IntegerField(db_column='SlopeTRD4', blank=True, null=True)

    # Field name made lowercase.
    sensor_dist4 = models.IntegerField(db_column='SENSOR_DIST4', blank=True, null=True)

    # Field name made lowercase.
    pwr2 = models.IntegerField(db_column='PWR2', blank=True, null=True)

    # Field name made lowercase.
    refvoltage2 = models.IntegerField(db_column='RefVoltage2', blank=True, null=True)

    # Field name made lowercase.
    straing_1 = models.IntegerField(db_column='STRAING_1', blank=True, null=True)

    # Field name made lowercase.
    straing_2 = models.IntegerField(db_column='STRAING_2', blank=True, null=True)

    # Field name made lowercase.
    straing_3 = models.IntegerField(db_column='STRAING_3', blank=True, null=True)

    # Field name made lowercase.
    straing_4 = models.IntegerField(db_column='STRAING_4', blank=True, null=True)

    # Field name made lowercase.
    an_5 = models.IntegerField(db_column='AN_5', blank=True, null=True)

    # Field name made lowercase.
    acc_x = models.IntegerField(db_column='ACC_X', blank=True, null=True)

    # Field name made lowercase.
    acc_y = models.IntegerField(db_column='ACC_Y', blank=True, null=True)

    # Field name made lowercase.
    acc_z = models.IntegerField(db_column='ACC_Z', blank=True, null=True)

    class Meta:
        db_table = 'periodicdata2'
