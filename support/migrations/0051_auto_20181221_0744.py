# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-12-21 07:44
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('support', '0050_auto_20181221_0740'),
    ]

    operations = [
        migrations.RenameField(
            model_name='projects',
            old_name='profit',
            new_name='profitMargin',
        ),
    ]