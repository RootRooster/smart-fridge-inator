"""
Script used to scrape data from the themealdb.com API.
"""

import requests
from meals.models import Ingredient, AmountIngredient, Meal

CATEGORIES_URL = "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
AREAS_URL = "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
INGREDIENTS_URL = "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
MEALS_URL = "https://www.themealdb.com/api/json/v1/1/search.php?f="


def get_json_data(url):
    """
    Retrieve JSON data from the provided URL.

    Args:
        url (str): The URL to fetch JSON data from.

    Returns:
        dict: The JSON data returned from the API.
    """
    response = requests.get(url)
    return response.json()


def parse_ingredients(raw_data):
    """
    Parse ingredients from the raw JSON data.

    Args:
        raw_data (dict): The raw JSON data containing ingredient information.

    Returns:
        tuple: A tuple containing a set of unique ingredient names and the count of unique ingredients.
    """
    ingredients_set = {ingredient["strIngredient"] for ingredient in raw_data["meals"]}
    return ingredients_set, len(ingredients_set)


def get_ingredient_amounts(meal_data):
    """
    Extract ingredient amounts from the meal data.

    Args:
        meal_data (dict): The JSON data containing meal information.

    Returns:
        tuple: A tuple containing a list of ingredient-amount tuples and a set of unique ingredient names.
    """
    ingredients = []
    unique_ingredients = set()

    for i in range(1, 21):
        ingredient_key = f"strIngredient{i}"
        measure_key = f"strMeasure{i}"

        if ingredient_key in meal_data and meal_data[ingredient_key]:
            ingredient = meal_data[ingredient_key]
            measure = meal_data.get(measure_key)

            unique_ingredients.add(ingredient)
            ingredients.append((ingredient, measure))
        else:
            break

    return ingredients, unique_ingredients


def get_meals():
    """
    Retrieve meal data from the API.

    Returns:
        tuple: A tuple containing a list of meal dictionaries and a set of unique ingredient names.
    """
    meals = []
    ingredients_set = set()

    for char in "abcdefghijklmnopqrstuvwxyz":
        url = MEALS_URL + char
        raw_data = get_json_data(url)

        if raw_data["meals"]:
            for meal in raw_data["meals"]:
                ingredients, ingredient_names = get_ingredient_amounts(meal)
                meal_info = {
                    "id": meal["idMeal"],
                    "name": meal["strMeal"],
                    "category": meal["strCategory"],
                    "area": meal["strArea"],
                    "instructions": meal["strInstructions"],
                    "image_url": meal["strMealThumb"],
                    "youtube_url": meal["strYoutube"],
                    "tags": meal["strTags"],
                    "ingredients": ingredients,
                }
                ingredients_set |= ingredient_names
                meals.append(meal_info)

    return meals, ingredients_set


print("Importing ingredients and meals...")
ingredients_from_api_names, _ = parse_ingredients(get_json_data(INGREDIENTS_URL))
meals, meal_ingredients = get_meals()
ingredients = ingredients_from_api_names | meal_ingredients

for ingredient in ingredients:
    Ingredient.objects.create(name=ingredient)

for meal in meals:
    obj = Meal.objects.create(
        name=meal["name"],
        tmdb_id=meal["id"],
        category_name=meal["category"],
        area_name=meal["area"],
        instructions=meal["instructions"],
        youtube_url=meal["youtube_url"],
        image_url=meal["image_url"],
    )
    for ingredient_amount in meal["ingredients"]:
        ingredient = Ingredient.objects.get(name=ingredient_amount[0])
        amount = ingredient_amount[1]
        amount_ingredient = AmountIngredient.objects.create(
            ingredient=ingredient,
            amount=amount
        )
        obj.amount_ingrediends.add(amount_ingredient)
    obj.save()

print(f"Imported {len(ingredients)} ingredients. Imported {len(meals)} meals.")
