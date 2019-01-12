# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-01-11 06:50
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('finance', '0025_auto_20190110_1342'),
    ]

    operations = [
        migrations.CreateModel(
            name='PurchaseOrder',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=100, unique=True)),
                ('address', models.CharField(max_length=100, unique=True)),
                ('personName', models.CharField(max_length=100, unique=True)),
                ('status', models.CharField(choices=[('Created', 'Created'), ('Sent', 'Sent'), ('Approved', 'Approved'), ('Final', 'Final')], default='created', max_length=5)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='purchaseUser', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='account',
            name='balance',
            field=models.FloatField(default=0),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='api',
            field=models.CharField(max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='transaction',
            name='apiCallParams',
            field=models.CharField(max_length=1500, null=True),
        ),
    ]
