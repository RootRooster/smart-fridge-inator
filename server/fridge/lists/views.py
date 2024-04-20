from django.shortcuts import render
from .models import MealPlan, UsersList
from .serializers import MealPlanSerializer, UsersListSerializer
from rest_framework import viewsets


class UsersListViewSet(viewsets.ModelViewSet):
    queryset = UsersList.objects.all()
    serializer_class = UsersListSerializer


class MealPlanViewSet(viewsets.ModelViewSet):
    queryset = MealPlan.objects.all()
    serializer_class = MealPlanSerializer
