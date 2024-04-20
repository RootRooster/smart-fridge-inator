from django.db import models


class MealPlan(models.Model):
    meal = models.ForeignKey('meals.Meal', on_delete=models.CASCADE)
    date_scheduled = models.DateField()


class IngredientsList(models.Model):
    fridge_ingredients = models.ForeignKey('meals.Ingredient', on_delete=models.CASCADE)

    def __str__(self):
        return self.fridge_ingredients.name
    