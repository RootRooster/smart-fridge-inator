from django.db import models


class Ingredient(models.Model):
    name = models.CharField(max_length=100, unique=True)


class AmountIngredient(models.Model):
    ingredient = models.ForeignKey(Ingredient, on_delete=models.CASCADE)
    amount = models.CharField(max_length=100)


class Meal(models.Model):
    name = models.CharField(max_length=100, unique=True)
    tmdb_id = models.CharField(max_length=10)
    category_name = models.CharField(max_length=30)
    area_name = models.CharField(max_length=30)
    instructions = models.TextField()
    image_url = models.URLField(max_length=200, null=True, blank=True)
    youtube_url = models.URLField(max_length=200, null=True, blank=True)
    amount_ingrediends = models.ManyToManyField(AmountIngredient)
