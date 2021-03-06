from django.conf.urls import url

from app import views

urlpatterns = [
    url(r'^$',views.index,name='index'),
    url(r'^cart/$',views.cart,name='cart'),
    url(r'^detail/$',views.detail,name='detail'),
    url(r'^register/$',views.register,name='register'),
    url(r'^login/$',views.login,name='login'),
    url(r'^detail02/(\d+)/$',views.detail02,name='detail02'),
    url(r'^detail03/$',views.detail03,name='detail03'),
    url(r'^checkemail/$', views.checkemail, name=
        'checkemail'),
    url(r'^middle/$',views.middle,name='middle'),
    url(r'^logout/$', views.logout, name='logout'),
    url(r'^show/$',views.show,name='show'),
    url(r'^addcart/$',views.addcart,name='addcart')

]