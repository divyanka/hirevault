"""

    File 		    : 	urls
    Package         :
    Description     :
    Project Name    :   Hirevault
    Created by Divyanka Arava

"""

from django.urls import re_path as url, path
from portfolio import views

urlpatterns = [
    path('', views.index), 
    path('gallery',views.get_images, name="gallery"),
    path('client_gallery',views.get_client_images, name="client_gallery"),
]
