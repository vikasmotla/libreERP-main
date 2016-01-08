# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-01-08 23:11
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import ecommerce.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='address',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField(max_length=200)),
                ('city', models.CharField(max_length=100)),
                ('state', models.CharField(max_length=50)),
                ('zipcode', models.CharField(max_length=10)),
                ('lat', models.CharField(max_length=15)),
                ('lon', models.CharField(max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='genericProduct',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=15)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='genericType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=15)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='listing',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('updated', models.DateTimeField(auto_now=True)),
                ('description', models.TextField(max_length=2000)),
                ('cod', models.BooleanField(default=False)),
                ('availability', models.CharField(choices=[('local', 'local'), ('state', 'state'), ('national', 'national'), ('international', 'international')], default='local', max_length=15)),
                ('priceModel', models.CharField(choices=[('quantity', 'quantity'), ('time', 'time'), ('custom', 'custom')], default='quantity', max_length=15)),
                ('freeReturns', models.BooleanField(default=False)),
                ('shippingOptions', models.CharField(choices=[('pickup', 'pickup'), ('homeDelivary', 'homeDelivary'), ('postal', 'postal')], default='pickup', max_length=15)),
                ('replacementPeriod', models.PositiveIntegerField(null=True)),
                ('approved', models.BooleanField(default=False)),
                ('category', models.CharField(choices=[('product', 'product'), ('service', 'service')], default='service', max_length=15)),
                ('specifications', models.TextField(max_length=2000)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ecommerceListingsUploads', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='media',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('link', models.TextField(max_length=300)),
                ('attachment', models.FileField(null=True, upload_to=ecommerce.models.getEcommercePictureUploadPath)),
                ('mediaType', models.CharField(choices=[('onlineVideo', 'onlineVideo'), ('video', 'video'), ('image', 'image')], default='image', max_length=10)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ecommerceMediaUploads', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='service',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('name', models.CharField(max_length=100)),
                ('cin', models.CharField(max_length=100)),
                ('tin', models.CharField(max_length=100)),
                ('mobile', models.PositiveIntegerField()),
                ('telephone', models.CharField(max_length=20)),
                ('logo', models.CharField(max_length=200)),
                ('description', models.TextField(max_length=2000)),
                ('address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ecommerce.address')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='ecommerceServices', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='spec',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fieldType', models.CharField(choices=[('char', 'char'), ('boolean', 'boolean'), ('float', 'float'), ('date', 'date')], default='char', max_length=15)),
                ('unit', models.CharField(max_length=15)),
                ('name', models.CharField(max_length=15)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('helpText', models.CharField(blank=True, max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='genericproduct',
            name='fields',
            field=models.ManyToManyField(blank=True, related_name='products', to='ecommerce.spec'),
        ),
        migrations.AddField(
            model_name='genericproduct',
            name='productType',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='ecommerce.genericType'),
        ),
    ]
