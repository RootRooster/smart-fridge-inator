from django.contrib import admin
from .models import Ingredient, Meal, AmountIngredient

# Register your models here.
admin.site.register(Ingredient)
admin.site.register(AmountIngredient)
admin.site.register(Meal)

