# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-10-02 12:08
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('warehouse', '0027_auto_20180921_0621'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='service',
            name='statecode',
        ),
    ]