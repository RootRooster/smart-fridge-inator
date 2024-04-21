import json
from channels.generic.websocket import WebsocketConsumer

from meals.models import Ingredient
from .models import IngredientsList
from asgiref.sync import async_to_sync


class RaspberryPiConsumer(WebsocketConsumer):
    
    def connect(self):
        self.channel_name = "deviceg"
        self.group_name = 'deviceg'  
        # Add the consumer to the group
        async_to_sync(self.channel_layer.group_add)(
            self.group_name,
            self.channel_name
        )
        print("Device connected!")
        self.accept()
    
    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.group_name,
            self.channel_name
        )
        print("Device disconnected!")
        
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        print(text_data_json)
        message = text_data_json['choices'][0]['message']['content']
        ingredients = message.replace(" ", "").split(',')
        IngredientsList.objects.all().delete()
        print(ingredients)
        for ingredient in ingredients:
            i = Ingredient.objects.get_or_create(name=ingredient)
            IngredientsList.objects.create(fridge_ingredients=i)
        self.send(text_data=json.dumps({
            'message': "Hello, device!"
        }))
    
    def send_message(self, event):
        self.send(text_data=json.dumps({'message': 'test'}))