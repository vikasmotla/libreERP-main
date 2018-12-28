
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User
from ERP.models import service
# Create your models here.
from time import time

def getPOSProductUploadPath(instance,filename):
    return "POS/displayPictures/%s_%s_%s"% (str(time()).replace('.','_'),instance.user.username,filename)

def getContractDoc(instance,filename):
    return "POS/contactDoc/%s_%s"% (str(time()).replace('.','_'),filename)



class Customer(models.Model):
    user = models.ForeignKey(User , related_name = 'posContacts' , null = False) # the user created it
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length = 100 , null = False)
    company = models.CharField(max_length = 100 , null = True)
    email = models.EmailField(null = True)
    mobile = models.CharField(max_length = 12 , null = True)
    notes = models.TextField(max_length=10000 , null=True)
    pan = models.CharField(max_length = 100 , null = True)
    gst = models.CharField(max_length = 100 , null = True)
    street = models.CharField(max_length = 100 , null = True)
    city = models.CharField(max_length = 100 , null = True)
    state = models.CharField(max_length = 100 , null = True)
    pincode = models.CharField(max_length = 100 , null = True)
    country = models.CharField(max_length = 100 , null = True)
    sameAsShipping = models.BooleanField(default = False)
    streetBilling = models.CharField(max_length = 100 , null = True)
    cityBilling = models.CharField(max_length = 100 , null = True)
    stateBilling = models.CharField(max_length = 100 , null = True)
    pincodeBilling = models.CharField(max_length = 100 , null = True)
    countryBilling = models.CharField(max_length = 100 , null = True)

    def __str__(self):
        return self.name

PRODUCT_META_TYPE_CHOICES = (
    ('HSN' , 'HSN'),
    ('SAC' , 'SAC')
)

class ProductMeta(models.Model):
    description = models.CharField(max_length = 500 , null = False)
    typ = models.CharField(max_length = 5 , default = 'HSN' , choices = PRODUCT_META_TYPE_CHOICES)
    code = models.PositiveIntegerField(null=False)
    taxRate = models.PositiveIntegerField(null = False)

UNIT_CHOICES = (
    ('Ton' , 'Ton'),
    ('Kilogram' , 'Kilogram'),
    ('Gram' , 'Gram'),
    ('Litre' , 'Litre'),
    ('Millilitre' , 'Millilitre'),
    ('Quantity' , 'Quantity'),
    ('Size' , 'Size'),
    ('Size and Color' , 'Size and Color'),
)




class Product(models.Model):
    user = models.ForeignKey(User , related_name = 'posProducts' , null = False) # the user created it
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now=True)
    name = models.CharField(max_length = 100 , null = False)
    unit = models.CharField(choices = UNIT_CHOICES , max_length = 10 , null = True)
    # productMeta = models.ForeignKey(ProductMeta , related_name="POSProducts" , null = True, blank = True)
    price = models.FloatField(null=False)
    displayPicture = models.ImageField(upload_to=getPOSProductUploadPath,null=True, blank = True)
    serialNo = models.CharField(max_length = 30, null=True, blank = True)
    description = models.TextField(max_length=10000,null=True, blank = True)
    inStock = models.IntegerField(default = 0)
    cost = models.PositiveIntegerField(default= 0)
    logistics = models.PositiveIntegerField(default = 0)
    serialId = models.CharField(max_length = 50, null=True, blank = True)
    reorderTrashold = models.PositiveIntegerField(default = 0)
    haveComposition = models.BooleanField(default = False)
    compositions = models.ManyToManyField("self" , related_name="parent" , blank = True)
    compositionQtyMap = models.CharField(max_length = 1000 , null = True, blank = True)
    discount = models.PositiveIntegerField(default = 0)
    grossWeight = models.CharField(max_length = 50 , null = True)
    # storeQty = models.ManyToManyField(StoreQty , related_name="productStore" , blank = True)
    alias = models.CharField(max_length = 500 , null = True)
    howMuch = models.FloatField(null=True)
    def __str__(self):
        return self.name

PAYMENT_CHOICES = (
    ('card' , 'card'),
    ('netBanking' , 'netBanking'),
    ('cash' , 'cash'),
    ('cheque' , 'cheque'),
    ('wallet' , 'wallet'),
    ('cashOnDelivery' , 'cashOnDelivery')
)

MONTH_CHOICES = (
    ('jan-march' , 'jan-march'),
    ('april-june' , 'april-june'),
    ('july-sep' , 'july-sep'),
    ('oct-dec' , 'oct-dec')
)


PROGRESS_STATUS = (
    ('Created','Created'),
    ('Started','Started'),
    ('Completed','Completed')
)

class ManufactureManifest(models.Model):
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now=True)
    user = models.ForeignKey(User , related_name = 'manufactureManifest' , null = True)
    product = models.ForeignKey(Product , related_name='inProgress')
    quantity = models.FloatField(null= True)
    status = models.CharField(choices = PROGRESS_STATUS, default='Created', max_length = 10 , null = True)
    specialInstruction = models.CharField(max_length = 500, null = True, blank = True)

class Invoice(models.Model):
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now=True)
    serialNumber = models.CharField(max_length = 100 , null = True)
    invoicedate = models.DateField(null=True)
    reference =   models.CharField(max_length = 100 , null = True)
    duedate =  models.DateField(null=True)
    # returndate =  models.DateField(null=True)
    returnquater =  models.CharField(choices = MONTH_CHOICES , max_length = 10 , null = True)
    customer=models.ForeignKey(Customer,null=True)
    products=models.CharField(max_length=10000,null=True)
    amountRecieved = models.PositiveIntegerField(default = 0)
    modeOfPayment = models.CharField(choices = PAYMENT_CHOICES , max_length = 10 , null = True)
    received = models.BooleanField(default = True)
    grandTotal = models.FloatField(null=False)
    totalTax = models.FloatField(null=False)
    paymentRefNum = models.CharField(max_length=10000,null=True)
    receivedDate = models.DateField(null=True)
    status = models.CharField(max_length = 20 , null = True , default = 'Created')

class ProductVerient(models.Model):
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now=True)
    parent = models.ForeignKey(Product , related_name='parentProducts')
    sku = models.CharField(max_length=255,null=True)
    unitPerpack = models.FloatField(default = 0)
    price = models.FloatField(null=True)
    discountedPrice = models.FloatField(default = 0.0)
    serialId = models.CharField(max_length = 50, null=True, blank = True)
    prodDesc =  models.CharField(max_length = 500, null=True, blank = True)

class Store(models.Model):
    created = models.DateTimeField(auto_now_add = True)
    name = models.CharField(max_length = 100 , null = False)
    address = models.CharField(max_length = 500 , null = False)
    pincode = models.PositiveIntegerField(null= True )
    mobile = models.CharField(max_length = 12 , null = True)
    email = models.EmailField(null = True)

class StoreQty(models.Model):
    created = models.DateTimeField(auto_now_add = True)
    store = models.ForeignKey(Store , related_name="POSStoreDetail", blank=True, null=True)
    quantity = models.FloatField(default = 0)
    product = models.ForeignKey(Product , related_name="storeProduct")
    productVariant = models.ForeignKey(ProductVerient , related_name="storeProdVar", blank=True, null=True)
    master = models.BooleanField(default = False)
    class Meta:
        unique_together = ('store' , 'product' , 'master', 'productVariant')

# class ProductMetaList(models.Model):
#     user = models.ForeignKey(User ,null = False , related_name ="productMetaList")
#     created = models.DateTimeField(auto_now_add = True)
#     updated = models.DateTimeField(auto_now=True)
#     description = models.CharField(max_length=10000,null=True)
#     code = models.PositiveIntegerField(default = 0)
#     taxRate = models.PositiveIntegerField(default = 0)
#     hsn = models.BooleanField(default = True)
#     sac = models.BooleanField(default = True)


class VendorProfile(models.Model):
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now=True)
    service = models.OneToOneField(service,related_name = 'services' , null = True )
    contactDoc = models.FileField(null = True , upload_to = getContractDoc)
    paymentTerm = models.PositiveIntegerField(default = 0)
    contactPersonName = models.CharField(max_length = 100 , null = False)
    contactPersonNumber = models.CharField(max_length = 100 , null = False)
    contactPersonEmail = models.CharField(max_length = 100 , null = True)

class VendorServices(models.Model):
    vendor = models.ForeignKey(VendorProfile,related_name = 'vendors' , null = True)
    product = models.ForeignKey(Product , related_name='vendorsProduct')
    rate = models.PositiveIntegerField(default = 0)
    fulfilmentTime = models.PositiveIntegerField(default = 0)
    logistics = models.PositiveIntegerField(default = 0)

PURCHASE_ORDER_STATUS_CHOICES = (
    ('created','created'),
    ('sent','sent'),
    ('returned','returned'),
    ('cancelled','cancelled'),
    ('recieved','recieved'),
    ('reconciled','reconciled'),
    ('approved','approved'),



)

class PurchaseOrder(models.Model):
    # purchaseOrderDate = models.DateField(null=True)
    user = models.ForeignKey(User , related_name = 'purchaseOrers' , null = True)
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now=True)
    service = models.ForeignKey(service,related_name = 'purchaseServices' , null = True)
    status = models.CharField(max_length = 10  ,default = 'created', choices = PURCHASE_ORDER_STATUS_CHOICES)
    products = models.CharField(max_length=10000,null=True)
    totalamount = models.PositiveIntegerField(default = 0)





class ExternalOrdersQtyMap(models.Model):
    product = models.ForeignKey(Product , related_name='externalOrders')
    qty = models.PositiveIntegerField(default=1)

EXTERNAL_ORDER_STATUS_CHOICES = (
    ('new','new'),
    ('packed','packed'),
    ('shipped','shipped'),
    ('recieved','recieved'),
    ('paid','paid'),
    ('reconciled','reconciled'),
    ('cancelled','cancelled'), # when user cancelled it
    ('rto','rto'),
    ('returned','returned'),
)

class ExternalOrders(models.Model):
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now=True)
    marketPlace = models.CharField(max_length = 50 , null = True)
    orderID = models.CharField(max_length = 100 , null = True)
    products = models.ManyToManyField(ExternalOrdersQtyMap , blank = False)
    status = models.CharField(max_length = 10 , default = 'new' , choices = EXTERNAL_ORDER_STATUS_CHOICES)
    buyersPrice = models.FloatField(null= True)
    tax = models.FloatField(null= True)
    shipper = models.CharField(max_length = 100 , null = True)
    shipperAWB = models.CharField(max_length = 100 , null = True)
    shippingFees = models.FloatField(null= True)
    shippingTax = models.FloatField(null= True)
    marketPlaceTax = models.FloatField(null= True)
    earnings = models.FloatField(null= True)
    buyerPincode = models.CharField(null= True , max_length = 7)

    class Meta:
        unique_together = ('marketPlace' , 'orderID')


TYPE_CHOICES = (
    ('system','system'),
    ('user','user')
)

class InventoryLog(models.Model):
    user = models.ForeignKey(User ,null = True , related_name ="inventoryLog")
    created = models.DateTimeField(auto_now_add = True)
    updated = models.DateTimeField(auto_now=True)
    product = models.ForeignKey(Product , related_name='inventoryLogProduct')
    typ = models.CharField(choices = TYPE_CHOICES , max_length = 10 , null = True)
    before = models.PositiveIntegerField(default = 0)
    after = models.PositiveIntegerField(default = 0)
    internalOrder = models.PositiveIntegerField(null = True)
    internalInvoice = models.ForeignKey(Invoice,null=True, related_name ="log")
    externalOrder = models.ForeignKey(ExternalOrders ,null = True , related_name ="externalOrders")

    class Meta:
        unique_together = ('externalOrder' , 'product')


from django.db.models.signals import post_save , pre_delete
from django.dispatch import receiver
from django.conf import settings as globalSettings
import requests
from ERP.models import application
@receiver(post_save, sender=Product, dispatch_uid="server_post_save")
def updateProductsStock(sender, instance, **kwargs):
    return
    try:

        for p in application.objects.get(name = 'app.productsInventory').permissions.all():
            print "Sending to : " , p.user.username
            requests.post("http://"+globalSettings.WAMP_SERVER+":8080/notify",
                json={
                  'topic': 'service.dashboard.' + p.user.username,
                  'args': [{'type' : 'productsInventory' , 'action' : 'updated' , 'pk' : instance.pk , 'inStock'  : instance.inStock}]
                }
            )

        for u in User.objects.filter(is_superuser=True):
            print "Sending to : " , u.username
            requests.post("http://"+globalSettings.WAMP_SERVER+":8080/notify",
                json={
                  'topic': 'service.dashboard.' + u.username,
                  'args': [{'type' : 'productsInventory' , 'action' : 'updated' , 'pk' : instance.pk , 'inStock'  : instance.inStock}]
                }
            )
    except:
        pass
