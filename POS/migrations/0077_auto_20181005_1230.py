# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-10-05 12:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('POS', '0076_auto_20181004_0439'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productverient',
            name='sku',
            field=models.CharField(max_length=10000, null=True, unique=True),
        ),
    ]