from django.http import HttpResponse
from django.views import View


class IndexView(View):
    info = 'Service SHMS'

    def get(self, request):
        return HttpResponse(self.info)
