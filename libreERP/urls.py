from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from HR.views import loginView , logoutView , home , registerView , tokenAuthentication , root, generateOTP, documentView
from support.views import getChatterScript
from homepage.views import blog,blogDetails,news,team, career ,policy ,terms ,refund , contacts , registration,index,crmHome,customerLoginView , customerHomeView

from ERP.views import serviceRegistration

app_name="libreERP"

urlpatterns = [
    url(r'^$', home , name ='root'),
    url(r'^CRM/', crmHome , name ='CRM'),
    url(r'^ERP/', home , name ='ERP'),
    url(r'^api/', include('API.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^login', loginView , name ='login'),
    url(r'^register', registration , name ='register'),
    url(r'^services', serviceRegistration , name ='serviceRegistration'),
    url(r'^token', tokenAuthentication , name ='tokenAuthentication'),
    url(r'^logout/', logoutView , name ='logout'),
    url(r'^corporate/', index , name ='index'),
    url(r'^api-auth/', include('rest_framework.urls', namespace ='rest_framework')),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^robots\.txt', include('robots.urls')),
    url(r'^generateOTP', generateOTP, name="generateOTP"),
    url(r'^documents', documentView , name ='document'),
    url(r'^blog/$', blog , name ='blog'),
    url(r'^blog/(?P<blogname>[\w|\W]+)/', blogDetails , name ='blogDetails'),
    url(r'^news', news , name ='news'),
    url(r'^team', team , name ='team'),
    url(r'^career', career , name ='career'),
    url(r'^policy', policy , name ='policy'),
    url(r'^terms', terms , name ='terms'),
    url(r'^refund', refund , name ='refund'),
    url(r'^contacts', contacts , name ='contacts'),
    url(r'^customer/login', customerLoginView , name ='customerLogin'),
    url(r'^customer/home/', customerHomeView , name ='customerhome'),
    url(r'^script/(?P<fileName>[\w|\W]+)', getChatterScript , name ='getChatterScript'),
]

if settings.DEBUG:
    urlpatterns +=static(settings.STATIC_URL , document_root = settings.STATIC_ROOT)
    urlpatterns +=static(settings.MEDIA_URL , document_root = settings.MEDIA_ROOT)
