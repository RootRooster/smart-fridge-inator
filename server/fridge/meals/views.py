from rest_framework import viewsets
from django.shortcuts import render
from .serializers import MealSerializer, \
IngredientSerializer, AmountIngredientSerializer
from .models import Meal, Ingredient, AmountIngredient


class MealViewSet(viewsets.ModelViewSet):
    queryset = Meal.objects.all()
    serializer_class = MealSerializer

    
class IngredientViewSet(viewsets.ModelViewSet):
    queryset = Ingredient.objects.all()
    serializer_class = IngredientSerializer


class AmountIngredientViewSet(viewsets.ModelViewSet):
    queryset = AmountIngredient.objects.all()
    serializer_class = AmountIngredientSerializer

