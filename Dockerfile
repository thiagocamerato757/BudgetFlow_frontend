FROM python:3.10-slim
WORKDIR /app
COPY ./frontend/public /app
CMD ["python3", "-m", "http.server", "8080"]
