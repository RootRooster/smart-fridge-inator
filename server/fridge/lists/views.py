from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.response import Response
from meals.serializers import MealSerializer
from meals.models import Meal
from .models import MealPlan, IngredientsList
from .serializers import MealPlanSerializer, IngredientsListSerializer
from rest_framework import viewsets
from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync

class IngredientsListViewSet(viewsets.ModelViewSet):
    queryset = IngredientsList.objects.all()
    serializer_class = IngredientsListSerializer

class MealPlanViewSet(viewsets.ModelViewSet):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer


class AddIngredientsToList(viewsets.ViewSet):
    def list(self, request):
        channel_layer = get_channel_layer()
        async_to_sync(channel_layer.send)('deviceg', {'type': 'get_ingredients'})
        async_to_sync(channel_layer.group_send)(
        "deviceg",
        {
            "type": "send_message",
            "message": "Hello, WebSocket!",
        },
        )
        return HttpResponse(status=200)


class MealFromIngredientsViewSet(viewsets.ViewSet):
    def list(self, request):
        ingredient_names = list(IngredientsList.objects.values_list('fridge_ingredients__name', flat=True))
        queryset = Meal.objects.filter(amount_ingrediends__ingredient__name__in=ingredient_names).distinct()
        serializer = MealSerializer(queryset, many=True)
        return Response(serializer.data)
    