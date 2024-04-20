import json
from channels.generic.websocket import WebsocketConsumer
from .models import IngredientsList

class RaspberryPiConsumer(WebsocketConsumer):
    def connect(self):
        print("Device connected!")
        self.accept()
    
    def disconnect(self, close_code):
        print("Device disconnected!")
        
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['choices'][0]['message']['content']
        ingredients = message.replace(" ", "").split(',')
        IngredientsList.objects.all().delete()
        for ingredient in ingredients:
            IngredientsList.objects.create(fridge_ingredients=ingredient)
        self.send(text_data=json.dumps({
            'message': message
        }))