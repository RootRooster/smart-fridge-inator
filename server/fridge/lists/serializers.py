from .models import MealPlan, UsersList
from rest_framework import serializers


class MealPlanSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MealPlan
        fields = ['meal', 'date_scheduled']
    
    def create(self, validated_data):
        return super().create(validated_data)


class UsersListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UsersList
        fields = ['fridge_ingredients', 'meal_plans']
    
