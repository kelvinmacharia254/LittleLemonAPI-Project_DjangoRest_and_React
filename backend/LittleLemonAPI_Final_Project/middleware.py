from django.http import JsonResponse, Http404, HttpResponse
from rest_framework import status
import logging

logger = logging.getLogger(__name__)


class CustomJsonResponseMiddleware:
    """
    Middleware to ensure that all API errors are returned as JSON responses.
    Handles 404 and 500 errors gracefully, including template responses.
    """

    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        try:
            # Code to be executed for each request before
            # the view (and later middleware) are called.
            response = self.get_response(request)

            # Check if response is an HTML response and convert to JSON if needed
            if isinstance(response, HttpResponse) and 'text/html' in response['Content-Type']:
                if response.status_code == 404:
                    response = JsonResponse(
                        {"message": f"'{request.path}' endpoint not found"},
                        status=status.HTTP_404_NOT_FOUND
                    )
                elif response.status_code == 500:
                    response = JsonResponse(
                        {"message": "Middleware--> An internal server error occurred."},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR
                    )

        except Http404 as e:
            # Handle 404 errors
            logger.error("Handling 404 error")
            response = JsonResponse(
                {"message": "The resource was not found."},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            # Handle 500 errors
            logger.error("Handling 500 error", exc_info=True)
            response = JsonResponse(
                {"message": "An internal server error occurred.", "error": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        # Return the response
        return response
