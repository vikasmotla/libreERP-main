# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-06-09 09:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketing', '0013_campaignlogs'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaignlogs',
            name='followupDate',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]