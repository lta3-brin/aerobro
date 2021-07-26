from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.utils import json

from stats.models.periodic import Periodicdata2
from stats.serializers import StatsSerializer
from stats.services.convert import ConvertService


class CalculateDisplacement(generics.ListAPIView):
    serializer_class = StatsSerializer
    queryset = Periodicdata2.objects.all()

    def get_queryset(self):
        station = self.request.query_params.get('station', 1)

        return Periodicdata2.objects.filter(station=int(station))

    @method_decorator(cache_page(60 * 60 * 2))
    def get(self, *args, **kwargs):
        disp = ConvertService.get_displacement(self.get_queryset().values_list())

        return Response(json.loads(disp))
