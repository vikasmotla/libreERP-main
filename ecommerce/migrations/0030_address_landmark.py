# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-07-17 05:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0029_auto_20180712_0517'),
    ]

    operations = [
        migrations.AddField(
            model_name='address',
            name='landmark',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
