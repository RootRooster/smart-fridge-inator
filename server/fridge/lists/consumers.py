import json
from channels.generic.websocket import WebsocketConsumer
class RaspberryPiConsumer(WebsocketConsumer):
    
    def connect(self):
        self.accept()
    
    def disconnect(self, close_code):
        print("Device disconnected!")
        
    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['choices'][0]
        self.send(text_data=json.dumps({
            'message': message
        }))