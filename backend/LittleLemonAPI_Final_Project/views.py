from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from django.http import Http404

from django.http import JsonResponse


# drf errors
def custom_exception_handler(exc, context):
    # Call drf default exception handler first
    response = exception_handler(exc, context)

    # Handle 404 errors e.g. missing endpoint
    if isinstance(exc, Http404):
        return Response(
            {"message": str(exc)}, status=status.HTTP_404_NOT_FOUND
        )

    if response is None:
        return Response({"message": str(exc)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# django errors
def custom_404_handler(request, exception=None):
    return JsonResponse(
        {"message": f"{request.path} endpoint not found"}, status=status.HTTP_404_NOT_FOUND)


def custom_500_handler(request, exception=None):
    return JsonResponse(
        {"message": str(exception)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )
