from django.urls import path, include
from rest_framework import routers
from .views import MealPlanViewSet, IngredientsListViewSet


routers = routers.DefaultRouter()
routers.register(r'mealplans', MealPlanViewSet)
routers.register(r'userslists', IngredientsListViewSet)


urlpatterns = [
    path('', include(routers.urls)),
]
