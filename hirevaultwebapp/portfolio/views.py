"""

    File 		    : 	views
    Package         :
    Description     :
    Project Name    :   Hirevault
    Created by Divyanka Arava

"""

from django.shortcuts import render
from PIL import Image
import os, os.path
from django.conf import settings
from django.http import JsonResponse, HttpResponse


# Create your views here.
def index(request):
	try:
		return render(request,'index.html')
	except Exception as error:
		pass

# View for portfolio section images
def get_images(request):
	try:
		imgs = []
		path = request.GET['param']
		image_folder_path = settings.IMAGE_FOLDER_PATH
		if path and image_folder_path is not None:
			folder_path = os.path.join(image_folder_path, path)
		static_path =  os.path.join(settings.APPEND_IMAGE_PATH, path)
		valid_images = [".jpg",".gif",".png",".tga"]
		for f in os.listdir(folder_path):
		    ext = os.path.splitext(f)[1]
		    if ext.lower() not in valid_images:
		        continue
		    imgs.append(static_path + '/' + f)
		return JsonResponse({"data":imgs})
	except Exception as error:
		return JsonResponse({})

# View for our work section images
def get_client_images(request):
	try:
		imgs = []
		path = request.GET['param']
		image_folder_path = settings.CLIENT_IMAGE_FOLDER_PATH
		if path and image_folder_path is not None:
			folder_path = os.path.join(image_folder_path, path)
		static_path =  os.path.join(settings.APPEND_CLIENT_IMAGE_PATH, path)
		valid_images = [".jpg",".gif",".png",".tga"]
		for f in os.listdir(image_folder_path):
		    ext = os.path.splitext(f)[1]
		    if ext.lower() not in valid_images:
		        continue
		    imgs.append(static_path + '/' + f)
		return JsonResponse({"data":imgs})
	except Exception as error:
		return JsonResponse({})