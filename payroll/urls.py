from django.conf.urls import include, url
from .views import *
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'payslip' , payslipViewSet , base_name = 'payslip')
router.register(r'report' , payrollReportViewSet , base_name = 'report')

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'getPayslip/$' , GetPayslip.as_view() ),
    url(r'payslipsReport/$' , PayslipsReport.as_view() ),
    url(r'getReimbursement/$' ,GetReimbursement.as_view()  ),
    url(r'tdsReport/$' ,TDSslipsReport.as_view()  ),
    url(r'pfReport/$' ,PFslipsReport.as_view()  )


] 
