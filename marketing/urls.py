from django.conf.urls import include, url
from .views import *
from rest_framework import routers
from django.views.decorators.csrf import csrf_exempt


router = routers.DefaultRouter()
router.register(r'contacts' , ContactsViewSet , base_name = 'contacts')
router.register(r'tag' , TagViewSet , base_name = 'tag')
router.register(r'campaign' , CampaignViewSet , base_name = 'campaign')
router.register(r'campaignLogs' , CampaignLogsViewSet , base_name = 'campaignLogs')
# router.register(r'leads' , LeadsViewSet , base_name = 'leads')
router.register(r'schedule' , ScheduleViewSet , base_name = 'schedule')
router.register(r'leads' , LeadsViewSet , base_name = 'leads')


urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'bulkContacts/$' , BulkContactsAPIView.as_view()),
    url(r'contactsScraped/$' , ContactsScrapedAPIView.as_view()),
    url(r'sourceSuggest/$' , SourceSuggestAPIView.as_view()),
    url(r'campaignDetails/$' , CampaignDetailsAPIView.as_view()),
    url(r'inviteMail/$' , InvitationMailApi.as_view()),
    url(r'schedulesData/$' , SchedulesDataApi.as_view()),
    url(r'convertLead/$' , ConvertLeadApi.as_view()),
]
