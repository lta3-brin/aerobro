# Generated by Django 3.2.5 on 2021-07-28 02:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stats', '0001_initial'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='periodicdata2',
            index=models.Index(fields=['station', 'logdt'], name='periodicdat_Station_c6cec2_idx'),
        ),
    ]
