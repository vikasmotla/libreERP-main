# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-04-28 06:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('POS', '0047_auto_20180426_0701'),
    ]

    operations = [
        migrations.AddField(
            model_name='vendorprofile',
            name='contactPersonEmail',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
