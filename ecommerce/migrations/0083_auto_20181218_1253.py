# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-12-18 12:53
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0082_auto_20181218_1244'),
    ]

    operations = [
        migrations.RenameField(
            model_name='country',
            old_name='unique_id',
            new_name='uniqueId',
        ),
        migrations.RenameField(
            model_name='state',
            old_name='unique_id',
            new_name='uniqueId',
        ),
    ]
