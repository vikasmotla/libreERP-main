# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-12-24 04:41
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('support', '0053_merge_20181221_1314'),
    ]

    operations = [
        migrations.AddField(
            model_name='projects',
            name='boeRefNumber',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AddField(
            model_name='projects',
            name='invoiceNumber',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='projects',
            name='profitMargin',
            field=models.FloatField(default=0),
        ),
    ]