# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-01-16 06:05
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('support', '0083_auto_20190116_0520'),
    ]

    operations = [
        migrations.RenameField(
            model_name='materialissuemain',
            old_name='vandor',
            new_name='vendor',
        ),
    ]