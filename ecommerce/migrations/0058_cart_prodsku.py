# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-10-05 06:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0057_auto_20180922_1415'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='prodSku',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]