from django.db import models

# Create your models here.
#商品类
class Items(models.Model):
    name = models.CharField(max_length=150)
    price = models.FloatField(max_length=20)
    unit = models.CharField(max_length=10)
    headImg = models.CharField(max_length=200)
    zoom = models.CharField(max_length=1000)
    small = models.CharField(max_length=1000)

    class Meta:
        db_table = 'mybuy_items'


#用户模型类
class User(models.Model):
    email = models.CharField(max_length=100,unique=True)
    password = models.CharField(max_length=50)
    name = models.CharField(max_length=40)
    phone = models.CharField(max_length=20)

    token = models.CharField(max_length=256)

    class Meta:
        db_table = 'my_user'



class Cart(models.Model):
    # 用户
    user = models.ForeignKey(User)
    # 商品
    goods = models.ForeignKey(Items)
    # 商品个数
    number = models.IntegerField()
    # 是否选中
    isselect = models.BooleanField(default=True)


    class Meta:
        db_table = 'my_cart'
