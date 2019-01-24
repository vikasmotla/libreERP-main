# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-12-28 10:03
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import ecommerce.models


class Migration(migrations.Migration):

    dependencies = [
        ('ecommerce', '0082_auto_20181228_0956'),
    ]

    operations = [
        migrations.CreateModel(
            name='Cities',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uniqueId', models.PositiveIntegerField(default=0)),
                ('name', models.CharField(max_length=50, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Countries',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uniqueId', models.PositiveIntegerField(default=0)),
                ('sortname', models.CharField(max_length=10, null=True)),
                ('name', models.CharField(max_length=50, null=True)),
                ('phonecode', models.PositiveIntegerField(default=0)),
                ('flag', models.ImageField(null=True, upload_to=ecommerce.models.getEcommerceCountryUploadPath)),
            ],
        ),
        migrations.CreateModel(
            name='States',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uniqueId', models.PositiveIntegerField(default=0)),
                ('name', models.CharField(max_length=50, null=True)),
                ('country', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='state', to='ecommerce.Countries')),
            ],
        ),
        migrations.AddField(
            model_name='cities',
            name='state',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='city', to='ecommerce.States'),
        ),
    ]