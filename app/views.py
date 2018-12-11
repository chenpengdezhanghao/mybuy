from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from app.models import Items


def index(request):
    # 读取json文件 写入数据库
    # with open('/home/chenpeng/Desktop/mybuy_app/static/json/items.json','r',encoding='utf8') as qf:
    #     contents = qf.read()
    #     contents = eval(contents)
    #     for dict in contents:
    #         items = Items()
    #         items.headImg = dict['headImg']
    #         items.name = dict['name']
    #         items.unit = dict['unit']
    #         items.price = dict['price']
    #         items.save()
    items = Items.objects.all()

    data = {
        "items": items
    }
    print(items.first().headImg)
    return render(request,'index/index.html',context=data)


def cart(request):
    return render(request,'cart/cart.html')


def detail(request):
    items = Items.objects.filter(pk=id).first()

    data = {
        "items":items
    }
    print(data)
    return render(request,'detail/detail.html',context=data)


def register(request):
    return render(request,'register/register.html')


def login(request):
    return render(request,'login/login.html')