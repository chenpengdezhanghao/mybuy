from django.conf.urls import url

from app import views

urlpatterns = [
    url(r'^$',views.index,name='index'),
    url(r'^cart/$',views.cart,name='cart'),
    url(r'^detail/$',views.detail,name='detail'),
    url(r'^register/$',views.register,name='register'),
    url(r'^login/$',views.login,name='login'),
    url(r'^detail02/$',views.detail02,name='detail02'),
    url(r'^detail03/$',views.detail03,name='detail03'),
]