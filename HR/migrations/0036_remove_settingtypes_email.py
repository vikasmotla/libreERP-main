# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-10-24 12:21
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('HR', '0035_settingtypes'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='settingtypes',
            name='email',
        ),
    ]