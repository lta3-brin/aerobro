from django.db import models

from stats.models.rtu import RtuInfo


class Ysivalue(models.Model):
    id = models.IntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    station = models.ForeignKey(RtuInfo, db_column='Station', on_delete=models.CASCADE)  # Field name made lowercase.
    logdt = models.DateTimeField(db_column='logDT', blank=True, null=True)  # Field name made lowercase.
    battery = models.IntegerField(db_column='Battery', blank=True, null=True)  # Field name made lowercase.
    doutput = models.IntegerField(db_column='Doutput', blank=True, null=True)  # Field name made lowercase.
    ai22_1 = models.IntegerField(db_column='AI22_1', blank=True, null=True)  # Field name made lowercase.
    ai22_2 = models.IntegerField(db_column='AI22_2', blank=True, null=True)  # Field name made lowercase.
    ai22_3 = models.IntegerField(db_column='AI22_3', blank=True, null=True)  # Field name made lowercase.
    ai22_4 = models.IntegerField(db_column='AI22_4', blank=True, null=True)  # Field name made lowercase.
    straing_1 = models.IntegerField(db_column='STRAING_1', blank=True, null=True)  # Field name made lowercase.
    straing_2 = models.IntegerField(db_column='STRAING_2', blank=True, null=True)  # Field name made lowercase.
    straing_3 = models.IntegerField(db_column='STRAING_3', blank=True, null=True)  # Field name made lowercase.
    straing_4 = models.IntegerField(db_column='STRAING_4', blank=True, null=True)  # Field name made lowercase.
    an_5 = models.IntegerField(db_column='AN_5', blank=True, null=True)  # Field name made lowercase.
    acc_x = models.IntegerField(db_column='ACC_X', blank=True, null=True)  # Field name made lowercase.
    acc_y = models.IntegerField(db_column='ACC_Y', blank=True, null=True)  # Field name made lowercase.
    acc_z = models.IntegerField(db_column='ACC_Z', blank=True, null=True)  # Field name made lowercase.
    battery2 = models.IntegerField(db_column='Battery2', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        db_table = 'ysivalue'
