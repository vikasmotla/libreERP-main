# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2018-12-15 06:34
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('support', '0035_products_prodqty'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='products',
            name='prodQty',
        ),
    ]