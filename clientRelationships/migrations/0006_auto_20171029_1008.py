# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-10-29 10:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientRelationships', '0005_auto_20171028_2300'),
    ]

    operations = [
        migrations.AddField(
            model_name='contract',
            name='archivedDate',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='contract',
            name='billedDate',
            field=models.DateTimeField(null=True),
        ),
        migrations.AddField(
            model_name='contract',
            name='recievedDate',
            field=models.DateTimeField(null=True),
        ),
    ]
