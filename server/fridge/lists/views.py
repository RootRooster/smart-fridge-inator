from django.shortcuts import render
from .models import MealPlan, IngredientsList
from .serializers import MealPlanSerializer, IngredientsListSerializer
from rest_framework import viewsets


class IngredientsListViewSet(viewsets.ModelViewSet):
    queryset = IngredientsList.objects.all()
    serializer_class = IngredientsListSerializer


class MealPlanViewSet(viewsets.ModelViewSet):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer