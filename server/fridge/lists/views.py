from django.shortcuts import render
from .models import MealPlan, IngredientsList
from .serializers import MealPlanSerializer, IngredientsListSerializer
from rest_framework import viewsets
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class IngredientsListViewSet(viewsets.ModelViewSet):
    queryset = IngredientsList.objects.all()
    serializer_class = IngredientsListSerializer

    def list(self, request):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.send)('device', {'type': 'get_ingredients'})


class MealPlanViewSet(viewsets.ModelViewSet):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer