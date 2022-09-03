"""

    File 		    : 	urls
    Package         :
    Description     :
    Project Name    :   Hirevault
    Created by Divyanka Arava

"""

from django.urls import re_path as url, path
from contact import views

urlpatterns = [
    path('',views.send_email, name="sendemail/"),

]
