# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-12-08 07:09
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('marketing', '0014_auto_20180609_0939'),
    ]

    operations = [
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('dated', models.DateField()),
                ('slot', models.CharField(max_length=15)),
                ('name', models.CharField(max_length=30)),
                ('emailId', models.CharField(max_length=20)),
            ],
        ),
    ]