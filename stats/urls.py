from django.urls import path

from stats.views.displacement import CalculateDisplacement

urlpatterns = [
    path('displacement', CalculateDisplacement.as_view())
]
