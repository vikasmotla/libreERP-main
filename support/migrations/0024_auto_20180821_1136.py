# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-08-21 11:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('support', '0023_merge_20180814_1202'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customerprofile',
            name='windowColor',
            field=models.CharField(default='#eeeeee', max_length=20, null=True),
        ),
    ]
