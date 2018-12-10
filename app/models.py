from django.db import models

# Create your models here.
class Items(models.Model):
    name = models.CharField(max_length=150)
    price = models.FloatField(max_length=20)
    unit = models.CharField(max_length=10)
    headImg = models.CharField(max_length=200)
    zoom = models.CharField(max_length=1000)
    small = models.CharField(max_length=1000)

    class Meta:
        db_table = 'mybuy_items'