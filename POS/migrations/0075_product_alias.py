# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-09-05 12:39
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('POS', '0074_auto_20180830_1125'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='alias',
            field=models.CharField(max_length=500, null=True),
        ),
    ]