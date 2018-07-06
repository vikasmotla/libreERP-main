# -*- coding: utf-8 -*-
# Generated by Django 1.10 on 2018-06-21 13:30
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patients', '0022_delete_dischargesummary'),
    ]

    operations = [
        migrations.CreateModel(
            name='DischargeSummary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('patientName', models.CharField(max_length=100)),
                ('age', models.CharField(max_length=100, null=True)),
                ('sex', models.CharField(max_length=100, null=True)),
                ('telephoneNo', models.CharField(max_length=100, null=True)),
                ('uhidNo', models.CharField(max_length=100, null=True)),
                ('ipNo', models.CharField(max_length=100, null=True)),
                ('treatingConsultantName', models.CharField(max_length=100, null=True)),
                ('treatingConsultantContact', models.CharField(max_length=100, null=True)),
                ('treatingConsultantDept', models.CharField(max_length=100, null=True)),
                ('dateOfAdmission', models.DateTimeField(null=True)),
                ('dateOfDischarge', models.DateTimeField(null=True)),
                ('mlcNo', models.CharField(max_length=100, null=True)),
                ('firNo', models.CharField(max_length=100, null=True)),
                ('provisionalDiagnosis', models.CharField(max_length=500, null=True)),
                ('finalDiagnosis', models.CharField(max_length=500, null=True)),
                ('complaintsAndReason', models.CharField(max_length=500, null=True)),
                ('summIllness', models.CharField(max_length=500, null=True)),
                ('keyFindings', models.CharField(max_length=500, null=True)),
                ('historyOfAlchohol', models.CharField(max_length=100, null=True)),
                ('pastHistory', models.CharField(max_length=500, null=True)),
                ('familyHistory', models.CharField(max_length=500, null=True)),
                ('courseInHospital', models.CharField(max_length=500, null=True)),
                ('patientCondition', models.CharField(max_length=500, null=True)),
                ('advice', models.CharField(max_length=500, null=True)),
                ('reviewOn', models.CharField(max_length=500, null=True)),
                ('complications', models.CharField(max_length=500, null=True)),
                ('doctorName', models.CharField(max_length=100, null=True)),
                ('regNo', models.CharField(max_length=100, null=True)),
                ('date', models.DateField(auto_now=True)),
            ],
        ),
    ]