# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-12-28 09:56
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0081_auto_20181228_0504'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cities',
            name='state',
        ),
        migrations.RemoveField(
            model_name='states',
            name='country',
        ),
        migrations.DeleteModel(
            name='Cities',
        ),
        migrations.DeleteModel(
            name='Countries',
        ),
        migrations.DeleteModel(
            name='States',
        ),
    ]