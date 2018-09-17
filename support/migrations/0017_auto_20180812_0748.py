# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-08-12 07:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('support', '0016_reviewcomment_chateddate'),
    ]

    operations = [
        migrations.AlterField(
            model_name='visitor',
            name='name',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='visitor',
            name='notes',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='visitor',
            name='phoneNumber',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]