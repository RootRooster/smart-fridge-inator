from django.urls import path, include
from rest_framework import routers
from .views import MealViewSet, IngredientViewSet, AmountIngredientViewSet


router = routers.DefaultRouter()
router.register(r'meals', MealViewSet)
router.register(r'ingredients', IngredientViewSet)
router.register(r'amountingredients', AmountIngredientViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
