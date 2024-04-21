from .models import MealPlan, IngredientsList
from rest_framework import serializers


class MealPlanSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = MealPlan
        fields = ['meal', 'date_scheduled']
    
    def create(self, validated_data):
        return super().create(validated_data)


class IngredientsListSerializer(serializers.HyperlinkedModelSerializer):
    fridge_ingredients_str = serializers.SerializerMethodField()
    class Meta:
        model = IngredientsList
        fields = ['fridge_ingredients_str']
    
    def get_fridge_ingredients_str(self, obj):
        return obj.fridge_ingredients.name
