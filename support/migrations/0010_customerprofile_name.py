# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-08-09 04:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('support', '0009_customerprofile_dp'),
    ]

    operations = [
        migrations.AddField(
            model_name='customerprofile',
            name='name',
            field=models.CharField(max_length=50, null=True),
        ),
    ]