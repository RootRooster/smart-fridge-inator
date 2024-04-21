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
    amount_ingredients_str = serializers.SerializerMethodField()
    class Meta:
        model = Meal
        fields = ['name', 'tmdb_id', 'category_name', 
                  'area_name', 'instructions', 'image_url', 
                  'youtube_url', 'amount_ingredients_str']
    
    def get_amount_ingredients_str(self, obj):
        amount_ingredients = obj.amount_ingrediends.all()
        amount_ingredients_str = [f"{ai.amount.strip()} of {ai.ingredient.name}" for ai in amount_ingredients]
        return amount_ingredients_str
        
