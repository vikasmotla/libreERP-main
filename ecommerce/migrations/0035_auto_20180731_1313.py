# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-07-31 13:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0034_auto_20180731_1238'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rating',
            name='headingVal',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='rating',
            name='textVal',
            field=models.CharField(max_length=1000),
        ),
    ]
