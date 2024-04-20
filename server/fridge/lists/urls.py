from django.urls import path, include
from rest_framework import routers
from .views import MealPlanViewSet, UsersListViewSet


routers = routers.DefaultRouter()
routers.register(r'mealplans', MealPlanViewSet)
routers.register(r'userslists', UsersListViewSet)


urlpatterns = [
    path('', include(routers.urls)),
]
