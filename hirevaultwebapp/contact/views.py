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
from django.http import HttpResponse
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def send_email(request):
	try:
		info = {}
		name = request.POST['name']
		subject = "Hai, Iam "+ name + " " + request.POST["subject"]
		email = request.POST['email']
		message = request.POST['message']
		res = send_mail(subject, message, email, ['divyanka.arava@gmail.com'])
		return HttpResponse("Mail successfully sent")
	except Exception as error:
		return HttpResponse({})