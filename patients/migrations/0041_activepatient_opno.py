# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-06-25 07:05
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0040_doctor_mobile'),
    ]

    operations = [
        migrations.AddField(
            model_name='activepatient',
            name='opNo',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]