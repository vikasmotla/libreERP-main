# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-10-23 12:07
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('HR', '0031_auto_20181023_1204'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rawdata',
            name='description',
            field=models.CharField(max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='rawdata',
            name='firstLCat',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='rawdata',
            name='secondLCat',
            field=models.CharField(max_length=100, null=True),
        ),
    ]