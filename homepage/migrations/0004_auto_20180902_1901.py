# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-09-02 19:01
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0003_enquiryandcontacts'),
    ]

    operations = [
        migrations.AlterField(
            model_name='registration',
            name='emailOTP',
            field=models.CharField(max_length=6, null=True),
        ),
        migrations.AlterField(
            model_name='registration',
            name='mobileOTP',
            field=models.CharField(max_length=6, null=True),
        ),
    ]