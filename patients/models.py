from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Doctor(models.Model):
    created = models.DateTimeField(auto_now_add = True)
    name = models.CharField(max_length = 100 , null = False)
    department = models.CharField(max_length = 100 , null = False)
    education = models.CharField(max_length = 100 , null = False)
    mobile = models.CharField(max_length = 15 , null = True)

class Patient(models.Model):
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateField(auto_now=True)
    firstName = models.CharField(max_length = 100 , null = False)
    lastName = models.CharField(max_length = 100 , null = False, blank = True)
    gender = models.CharField(max_length = 100 , null = False, blank = True)
    dateOfBirth = models.DateField( null= True)
    age = models.CharField(max_length = 150, null = True )
    uniqueId = models.CharField(max_length = 100 , null = True, blank = True)
    email = models.CharField(max_length = 100 , null = True, blank = True)
    phoneNo = models.CharField(null=False , max_length = 100)
    emergencyContact1 = models.CharField(null=True , max_length = 100)
    emergencyContact2 = models.CharField(null=True , max_length = 100)
    street = models.TextField(max_length = 100 , null= True, blank = True )
    city = models.CharField(max_length = 15 , null= True, blank = True )
    pin = models.IntegerField(null= True , blank = True)
    state = models.CharField(max_length = 20 , null= True, blank = True )
    country = models.CharField(max_length = 20 , null= True, blank = True , default = 'India')

    class Meta:
        ordering = ('-created',)

class PatientComments(models.Model):
    heading = models.CharField(max_length = 100 , null = False)
    data = models.CharField(max_length = 100 , null = False)
    user = models.ForeignKey(Patient , related_name='user')

STATUS_CHOICES = (
    ('checkedIn','checkedIn'),
    ('onGoingTreatment','onGoingTreatment'),
    ('operation','operation'),
    ('observation','observation'),
    ('readyToDischarged','readyToDischarged'),
    ('dishcharged','dishcharged'),
    ('settled','settled'),
)

class ActivePatient(models.Model):
    patient = models.ForeignKey(Patient , related_name='patientIn')
    inTime = models.DateTimeField( null= True )
    outTime = models.DateTimeField( null= True )
    status = models.CharField(choices = STATUS_CHOICES , max_length = 100 , null = False ,default='checkedIn')
    comments = models.ManyToManyField(PatientComments , related_name='inPatientComments' , blank = True)
    outPatient = models.BooleanField(default = False)
    created = models.DateTimeField(auto_now_add = True , null= True)
    dateOfDischarge = models.DateTimeField( null= True  , blank = True)
    mlc = models.BooleanField(default = False)
    cash = models.BooleanField(default = False)
    insurance = models.BooleanField(default = False)
    opNo = models.CharField(max_length = 100 , null = True  , blank = True)
    docName = models.ForeignKey(Doctor , null= True , blank = True, related_name='primaryDoctor')
    msg = models.CharField(max_length = 100 , null = True  , blank = True ,default = 'Thank You')
    class Meta:
        ordering = ('-created',)

class DischargeSummary(models.Model):
    patient = models.ForeignKey(ActivePatient , related_name='dischargeSummary', null= True)
    ipNo = models.CharField(max_length = 100 , null = True  , blank = True)
    treatingConsultant = models.ManyToManyField(Doctor , related_name='patients')
    mlcNo = models.CharField(max_length = 100 , null = False  , blank = True , default='')
    firNo = models.CharField(max_length = 100 , null = False  , blank = True , default='')
    provisionalDiagnosis = models.TextField(max_length = 4000 , null = False , blank = True , default='')
    finalDiagnosis = models.TextField(max_length = 4000 , null = False  , blank = True , default='')
    complaintsAndReason = models.TextField(max_length = 4000 , null = False  , blank = True , default='')
    summIllness = models.TextField(max_length = 4000 , null = False  , blank = True , default='')
    keyFindings = models.TextField(max_length = 4000 , null = False , blank = True , default='')
    historyOfAlchohol = models.TextField(max_length = 4000 , null = False , blank = True , default='')
    pastHistory = models.TextField(max_length = 4000 , null = False , blank = True , default='')
    familyHistory = models.TextField(max_length = 4000 , null = False , blank = True , default='')
    summaryKeyInvestigation = models.TextField(max_length = 4000 , null = False , blank = True , default='')
    courseInHospital = models.TextField(max_length = 4000 , null = False , blank = True , default='')
    patientCondition= models.TextField(max_length = 4000 , null = False , blank = True , default='')
    advice = models.TextField(max_length =4000 , null = False , blank = True , default='')
    reviewOn = models.TextField(max_length = 4000 , null = False , blank = True , default='')
    complications = models.TextField(max_length = 4000 , null = False , blank = True , default='')
    treatmentGiven = models.TextField(max_length = 4000 , null = False , blank = True , default='')

class Product(models.Model):
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateField(auto_now=True)
    name = models.CharField(max_length = 100 , null = False)
    rate = models.PositiveIntegerField(null=True)

class Invoice(models.Model):
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateField(auto_now=True)
    activePatient = models.ForeignKey(ActivePatient , related_name='invoices')
    invoiceName = models.CharField(max_length = 20 , null= True )
    grandTotal = models.PositiveIntegerField(null=True, default = 0)
    quantity = models.CharField(max_length = 100 , default=1)
    products = models.CharField(max_length=10000,null=True)
    billed = models.BooleanField(default = False)
    discount = models.PositiveIntegerField(default=0)