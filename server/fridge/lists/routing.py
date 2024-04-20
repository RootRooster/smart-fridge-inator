from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from .consumers import RaspberryPiConsumer

application = ProtocolTypeRouter({
    'websocket': URLRouter([
        path('ws/rpi/', RaspberryPiConsumer.as_asgi()),
    ])
})