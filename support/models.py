# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from ERP.models import service
from django.db import models
from django.contrib.auth.models import User, Group
from time import time


def getUploadedProductSheets(instance , filename ):
    return 'support/product_sheets/%s__%s' % (str(time()).replace('.', '_'), filename)

PURCHASE_STATUS = (
('created' , 'created'),
('sent_for_approval' , 'sent_for_approval'),
('approved' , 'approved'),
('ongoing' , 'ongoing'),
('archieve' , 'archieve'),
)

STOCK__STATUS = (
('live' , 'live'),
('completed' , 'completed')
)

class ProductSheet(models.Model):
    created = models.DateTimeField(auto_now_add = True)
    sheet = models.FileField(null = True , upload_to = getUploadedProductSheets)
    file_name = models.CharField(max_length=50, null=True)



class Products(models.Model):
    created = models.DateTimeField(auto_now_add = True)
    part_no = models.CharField(max_length=20, unique=True , null=True)
    description_1 = models.CharField(max_length=100, null=True)
    description_2 = models.CharField(max_length=100, null=True)
    weight = models.FloatField(null=True)
    price = models.FloatField(null=True)
    parent = models.ForeignKey('self', related_name='parentProduct', null=True)
    sheet = models.ForeignKey(ProductSheet, related_name='productsSheet', null=True)
    customs_no = models.CharField(max_length=15, null=True)
    bar_code = models.CharField(max_length=50, null=True)

class Test(models.Model):
    created = models.DateTimeField(auto_now_add = True)


class Vendor(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    name = models.CharField(max_length = 100 , null = True,)
    city = models.CharField(max_length = 100 , null = True,blank =True)
    street = models.CharField(max_length = 100 , null = True,blank =True)
    state = models.CharField(max_length = 100 , null = True,blank =True)
    pincode = models.CharField(max_length = 20 , null = True,blank =True)
    country = models.CharField(max_length = 20 , null = True,blank =True)
    mobile = models.CharField(max_length = 12 , null = True,blank =True)
    gst = models.CharField(max_length = 20 , null = True,)
    email = models.EmailField(null = True,)


class Projects(models.Model):
    created = models.DateTimeField(auto_now_add  = True )
    title = models.CharField(max_length = 20)
    service = models.ForeignKey(service , related_name = 'service' ,null = False)
    date = models.DateField(null = True)
    machinemodel = models.CharField(max_length = 20 , null = True , blank =True)
    comm_nr = models.CharField(max_length = 20 , null = True , blank =True)
    customer_ref = models.CharField(max_length = 20 , null = True , blank =True)
    responsible = models.ManyToManyField(User , related_name = 'managingService' , blank = True)
    approved1 = models.BooleanField(default = False)
    approved2 = models.BooleanField(default = False)
    approved1_user = models.ForeignKey(User , related_name='approveduser1' , null = True)
    approved2_user = models.ForeignKey(User , related_name='approveduser2' , null = True)
    approved1_date = models.DateField(null = True)
    approved2_date = models.DateField(null = True)
    status = models.CharField(choices = PURCHASE_STATUS , max_length = 10 , default = 'created')
    revision =  models.CharField( max_length = 20 ,null = True , blank = True)
    savedStatus = models.BooleanField(default = False)
    invoiceValue = models.FloatField(null = True)
    packing = models.FloatField(default = 0)
    insurance = models.FloatField(default = 0)
    freight = models.FloatField(default = 0)
    assessableValue = models.FloatField(default = 0)
    gst1 = models.FloatField(default = 0)
    gst2 = models.FloatField(default = 0)
    clearingCharges1 = models.FloatField(default = 0)
    clearingCharges2 = models.FloatField(default = 0)
    exRate = models.FloatField( default = 75)
    profitMargin = models.FloatField( default = 0)
    vendor = models.ForeignKey(Vendor , related_name='vendor' , null = True)



class BoM(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User , related_name='usersBoM' , null = False)
    project = models.ManyToManyField(Projects)
    products = models.ForeignKey( Products , null = True)
    quantity1 = models.PositiveIntegerField(null=True , default=0)
    quantity2 = models.PositiveIntegerField(null=True , default=0)
    price = models.FloatField(null = True)
    landed_price = models.FloatField(null=True , default=0)
    invoice_price = models.FloatField(null=True , default=0)
    customer_price = models.FloatField(null=True , default=0)

class Inventory(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey( Products , null = True)
    qty = models.PositiveIntegerField(null=True , default=0)
    rate = models.FloatField(null = True)

class MaterialIssue(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey( Products , null = True)
    qty = models.PositiveIntegerField(null=True , default=0)
    price = models.FloatField(null = True)
    stock = models.CharField(max_length = 500 , null = True , blank =True)

class MaterialIssueMain(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    materialIssue = models.ManyToManyField(MaterialIssue, related_name='materialqty')
    user =  models.ForeignKey(User , related_name='materialuser')
    project = models.ForeignKey(Projects , related_name='materialproject')

class StockCheck(models.Model):
    inventory =   models.ForeignKey( Inventory , null = True)
    date = models.DateField(null = True)
    count = models.PositiveIntegerField(null=True , default=0)
    status = models.CharField(choices = STOCK__STATUS , max_length = 10 , default = 'live')

class StockCheckLog(models.Model):
    product =  models.ForeignKey( StockCheck , null = True)
