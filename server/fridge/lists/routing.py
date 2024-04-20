from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from .consumers import RaspberryPiConsumer

from django.urls import re_path

websocket_urlpatterns = [
    re_path(r"ws/rpi/$", RaspberryPiConsumer.as_asgi()),
]
