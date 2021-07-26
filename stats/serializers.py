from rest_framework import serializers

from stats.models.periodic import Periodicdata2


class StatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Periodicdata2
        fields = '__all__'
