# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-11-22 10:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('warehouse', '0034_auto_20181019_1240'),
    ]

    operations = [
        migrations.AddField(
            model_name='contract',
            name='activeStatus',
            field=models.BooleanField(default=True),
        ),
    ]
