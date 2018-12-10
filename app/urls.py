from django.conf.urls import url

from app import views

urlpatterns = [
    url(r'^$',views.index,name='index'),
    url(r'^cart/$',views.cart,name='cart'),
    url(r'^detail/$',views.detail,name='detail')
]