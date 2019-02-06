# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-02-02 13:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('homepage', '0003_delete_registration'),
    ]

    operations = [
        migrations.CreateModel(
            name='Registration',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('token', models.CharField(max_length=50)),
                ('emailOTP', models.CharField(max_length=6)),
                ('mobileOTP', models.CharField(max_length=6)),
                ('email', models.CharField(max_length=60, null=True)),
                ('mobile', models.CharField(max_length=15, null=True)),
            ],
        ),
    ]