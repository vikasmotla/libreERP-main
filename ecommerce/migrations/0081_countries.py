# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-12-18 12:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0080_remove_genericimage_backgroundimage'),
    ]

    operations = [
        migrations.CreateModel(
            name='Countries',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('unique_id', models.PositiveIntegerField(default=0)),
                ('sortname', models.CharField(max_length=7, null=True)),
                ('name', models.CharField(max_length=7, null=True)),
                ('phonecode', models.PositiveIntegerField(default=0)),
            ],
        ),
    ]
