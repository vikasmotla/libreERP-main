# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-11-29 10:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0073_auto_20181116_1256'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='desc',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]
