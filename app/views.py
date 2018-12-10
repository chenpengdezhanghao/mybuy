from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from app.models import Items


def index(request):
    with open('/home/chenpeng/Desktop/mybuy_app/static/json/items.json','r',encoding='utf8') as qf:
        contents = qf.read()
        contents = eval(contents)
        for dict in contents:
            items = Items()
            items.headImg = dict['headImg']
            items.name = dict['name']
            items.unit = dict['unit']
            items.price = dict['price']
            items.save()

    return render(request,'index/index.html')


def cart(request):
    return render(request,'cart/cart.html')


def detail(request):
    return render(request,'detail/detail.html')

