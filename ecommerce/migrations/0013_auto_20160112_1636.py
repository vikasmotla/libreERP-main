# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-01-12 11:06
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0012_auto_20160112_1612'),
    ]

    operations = [
        migrations.RenameField(
            model_name='service',
            old_name='description',
            new_name='about',
        ),
    ]