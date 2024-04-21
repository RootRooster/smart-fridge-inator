from django.urls import path, include
from rest_framework import routers
from .views import MealPlanViewSet, IngredientsListViewSet, AddIngredientsToList, MealFromIngredientsViewSet


routers = routers.DefaultRouter()
routers.register(r'mealplans', MealPlanViewSet)
routers.register(r'ingredientslists', IngredientsListViewSet)
routers.register(r'addtolist', AddIngredientsToList, basename='IngredientsList')
routers.register(r'mealfromingredients', MealFromIngredientsViewSet, basename='MealFromIngredients')

urlpatterns = [
    path('', include(routers.urls)),
]
