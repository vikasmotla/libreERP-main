# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-10-19 12:40
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('warehouse', '0033_auto_20181019_1234'),
    ]

    operations = [
        migrations.AlterField(
            model_name='invoice',
            name='archivedDate',
            field=models.DateTimeField(null=True),
        ),
        migrations.AlterField(
            model_name='invoice',
            name='fromDate',
            field=models.DateField(null=True),
        ),
    ]