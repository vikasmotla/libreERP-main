# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-09-18 07:34
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('warehouse', '0022_invoice_grandtotal'),
    ]

    operations = [
        migrations.CreateModel(
            name='Commodity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=100)),
                ('qty', models.PositiveIntegerField(null=True)),
                ('contract', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='commodities', to='warehouse.Contract')),
            ],
        ),
        migrations.CreateModel(
            name='CommodityQty',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('checkIn', models.PositiveIntegerField(null=True)),
                ('checkOut', models.PositiveIntegerField(null=True)),
                ('Balance', models.PositiveIntegerField(null=True)),
            ],
        ),
    ]
