# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-10-29 10:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientRelationships', '0006_auto_20171029_1008'),
    ]

    operations = [
        migrations.AddField(
            model_name='deal',
            name='duePeriod',
            field=models.PositiveIntegerField(default=7),
        ),
    ]
