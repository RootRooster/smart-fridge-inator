from django.db import models


class MealPlan(models.Model):
    meal = models.ForeignKey('meals.Meal', on_delete=models.CASCADE)
    date_scheduled = models.DateField()


class UsersList(models.Model):
    fridge_ingredients = models.ManyToManyField('meals.Ingredient')
    meal_plans = models.ManyToManyField(MealPlan)
