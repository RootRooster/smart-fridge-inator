from .models import MealPlan, IngredientsList
from rest_framework import serializers


class MealPlanSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MealPlan
        fields = ['meal', 'date_scheduled']
    
    def create(self, validated_data):
        return super().create(validated_data)


class IngredientsListSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = IngredientsList
        fields = ['fridge_ingredients']
