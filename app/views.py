import hashlib
import random
import time

from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect

# Create your views here.
from app import models
from app.models import Items, User


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

    token = request.session.get('token')


    data = {}
    data = {
        "items": items
    }
    if token:
        user = User.objects.get(token=token)
        data['name'] = user.name
        data['phone'] = user.phone
        data['email'] = user.email


    print(items.first().headImg)
    return render(request,'index/index.html',context=data)


def cart(request):
    return render(request,'cart/cart.html')


def detail(request):
    # items = Items.objects.filter(pk=id).first()
    items = Items.objects.all()

    data = {
        "items": items
    }
    return render(request,'detail/detail.html',context=data)


def generate_password(param):
    md5 = hashlib.md5()
    md5.update(param.encode('utf-8'))
    return md5.hexdigest()


def generate_token():
    md5 = hashlib.md5()
    temp = str(time.time()) + str(random.random())
    md5.update(temp.encode('utf-8'))
    return md5.hexdigest()


def register(request):
    if request.method == 'GET':
        return render(request, 'register/register.html')
    elif request.method == 'POST':
        user = User()
        user.email = request.POST.get('email')
        user.password = generate_password(request.POST.get('password'))
        user.name = request.POST.get('name')
        user.phone = request.POST.get('phone')

        # 状态保持
        user.token = generate_token()
        user.save()
        request.session['token'] = user.token

        return redirect('mt:middle')
    
    


def login(request):
    if request.method == 'GET':
        return render(request, 'login/login.html')
    elif request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        print(generate_password(password))

        try:
            # 不存在，会抛出异常
            # 多个时，会抛出异常　【email是唯一约束】
            user = User.objects.get(email=email)
            if user.password == generate_password(password):
                user.token = generate_token()
                user.save()
                request.session['token'] = user.token
                return redirect('mt:index')
            else:
                return render(request, 'login/login.html', context={'p_err': '密码错误'})
        except:
            return render(request, 'login/login.html', context={'u_err': '账号不存在'})


def detail02(request,id):
    items = Items.objects.get(pk=id)

    data = {
        "items":items
    }

    return render(request,'detail/detail02.html',context=data)


def detail03(request):
    return render(request,'detail/detail03.html')


def checkemail(request):
    email = request.GET.get('email')

    users = User.objects.filter(email=email)
    if users.exists():
        return JsonResponse({'msg': '账号已被占用!', 'status': 0})
    else:
        return JsonResponse({'msg': '账号是可以使用!', 'status': 1})


def middle(request):
    return render(request,'register/middle.html')


def logout(request):
    request.session.flush()
    return redirect('mt:index')


def show(request):      #添加数据
    obj = models.Items.objects.get(price=699)
    obj.zoom = ["img/detailimg/common4-01.jpg"]
    obj.save()
    return HttpResponse('hao le')