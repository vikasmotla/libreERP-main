# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-07-17 05:47
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0030_address_landmark'),
    ]

    operations = [
        migrations.RenameField(
            model_name='address',
            old_name='landmark',
            new_name='landMark',
        ),
    ]