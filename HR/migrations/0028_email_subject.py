# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-10-08 11:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('HR', '0027_email_messageid'),
    ]

    operations = [
        migrations.AddField(
            model_name='email',
            name='subject',
            field=models.CharField(max_length=1500, null=True),
        ),
    ]