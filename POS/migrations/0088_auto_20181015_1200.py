# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-10-15 12:00
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('POS', '0087_auto_20181013_1054'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='storeqty',
            unique_together=set([('store', 'product', 'master', 'productVariant')]),
        ),
    ]