# -*- coding: utf-8 -*-
# Generated by Django 1.11.16 on 2019-01-27 05:57
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('LMS', '0063_section_seotitle'),
    ]

    operations = [
        migrations.AddField(
            model_name='qpart',
            name='sequence',
            field=models.PositiveIntegerField(null=True),
        ),
    ]
