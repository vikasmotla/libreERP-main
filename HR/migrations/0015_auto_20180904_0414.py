# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-09-04 04:14
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('HR', '0014_role'),
    ]

    operations = [
        migrations.RenameField(
            model_name='role',
            old_name='text',
            new_name='applications',
        ),
        migrations.AddField(
            model_name='role',
            name='name',
            field=models.CharField(max_length=200, null=True),
        ),
    ]
