# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-01-18 13:39
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('support', '0090_invoiceqty'),
    ]

    operations = [
        migrations.AddField(
            model_name='invoiceqty',
            name='invoice',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='support.Invoice'),
        ),
    ]