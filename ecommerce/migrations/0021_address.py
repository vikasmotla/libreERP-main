# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-07-09 11:02
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0020_offerbanner_imageportrait'),
    ]

    operations = [
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField(blank=True, max_length=300, null=True)),
                ('city', models.CharField(blank=True, max_length=100, null=True)),
                ('state', models.CharField(blank=True, max_length=50, null=True)),
                ('pincode', models.PositiveIntegerField(blank=True, null=True)),
                ('lat', models.CharField(blank=True, max_length=15, null=True)),
                ('lon', models.CharField(blank=True, max_length=15, null=True)),
                ('country', models.CharField(blank=True, max_length=50, null=True)),
            ],
        ),
    ]