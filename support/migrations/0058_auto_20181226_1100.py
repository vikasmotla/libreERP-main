# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-12-26 11:00
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('support', '0057_auto_20181226_0831'),
    ]

    operations = [
        migrations.AlterField(
            model_name='products',
            name='custom',
            field=models.FloatField(default=7.5),
        ),
        migrations.AlterField(
            model_name='products',
            name='gst',
            field=models.FloatField(default=18),
        ),
    ]