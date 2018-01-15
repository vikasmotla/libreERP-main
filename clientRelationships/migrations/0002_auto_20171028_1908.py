# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2017-10-28 19:08
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clientRelationships', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ProductMeta',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=500)),
                ('typ', models.CharField(choices=[('HSN', 'HSN'), ('SAC', 'SAC')], default='HSN', max_length=5)),
                ('code', models.PositiveIntegerField()),
                ('taxRate', models.PositiveIntegerField()),
            ],
        ),
        migrations.AlterField(
            model_name='contract',
            name='status',
            field=models.CharField(choices=[('cancelled', 'cancelled'), ('quoted', 'quoted'), ('approved', 'approved'), ('billed', 'billed'), ('received', 'received'), ('dueElapsed', 'dueElapsed')], default='quoted', max_length=10),
        ),
    ]
