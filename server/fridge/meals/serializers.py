from .models import Ingredient, AmountIngredient, Meal
from rest_framework import serializers


class IngredientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Ingredient
        fields = ['name']
    

class AmountIngredientSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = AmountIngredient
        fields = ['ingredient', 'amount']


class MealSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Meal
        fields = ['name', 'tmdb_id', 'category_name', 
                  'area_name', 'instructions', 'image_url', 
                  'youtube_url', 'amount_ingrediends']
        
