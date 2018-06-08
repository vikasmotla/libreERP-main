# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-06-08 04:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketing', '0007_campaign_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaign',
            name='typ',
            field=models.CharField(choices=[('email', 'email'), ('sms', 'sms'), ('call', 'call')], max_length=10, null=True),
        ),
    ]
