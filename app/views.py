from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
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

    data = {
        "items": items
    }
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
    # md5 = hashlib.md5()
    # md5.update(param.encode('utf-8'))
    # return md5.hexdigest()
    pass


def register(request):
    if request.method == 'GET':
        return render(request, 'register/register.html')
    elif request.method == 'POST':
        user = User()
        user.email = request.POST.get('email')
        user.password = generate_password(request.POST.get('password'))
        user.name = request.POST.get('name')
        user.phone = request.POST.get('phone')
    return render(request,'index/index.html')


def login(request):
    return render(request,'login/login.html')


def detail02(request):
    return render(request,'detail/detail02.html')


def detail03(request):
    return render(request,'detail/detail03.html')