# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-09-18 13:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PIM', '0007_auto_20180917_0737'),
    ]

    operations = [
        migrations.AlterField(
            model_name='blogpost',
            name='shortUrl',
            field=models.CharField(max_length=100, null=True, unique=True),
        ),
    ]
