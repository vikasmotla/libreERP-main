from django.conf.urls import include, url
from .views import *
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'users' , UserViewSet , base_name = 'user')
router.register(r'groups' , GroupViewSet)
router.register(r'usersAdminMode' , userAdminViewSet , base_name = 'userAdminMode')
router.register(r'userSearch' , UserSearchViewSet , base_name = 'userSearch')
router.register(r'profile' , userProfileViewSet , base_name ='profile')
router.register(r'profileAdminMode' , userProfileAdminModeViewSet , base_name ='profileAdminMode')
router.register(r'designation' , userDesignationViewSet , base_name = 'designation')
router.register(r'rank' , rankViewSet , base_name = 'rank')
router.register(r'payroll' , payrollViewSet , base_name = 'payroll')
router.register(r'leave' , leaveViewSet , base_name = 'leave')
router.register(r'sms' , SMSViewSet , base_name = 'sms')
router.register(r'call' , callViewSet , base_name = 'call')
router.register(r'location' , locationViewSet , base_name = 'location')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'leavesCal/$' , LeavesCalAPI.as_view()),
    url(r'profileOrgCharts/$' , OrgChartAPI.as_view()),
]
