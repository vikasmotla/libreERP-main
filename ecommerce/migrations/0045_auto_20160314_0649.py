# -*- coding: utf-8 -*-
# Generated by Django 1.9.3 on 2016-03-14 01:19
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0044_customerprofile_attachment'),
    ]

    operations = [
        migrations.AddField(
            model_name='offering',
            name='end',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='offering',
            name='start',
            field=models.DateTimeField(null=True),
        ),
    ]