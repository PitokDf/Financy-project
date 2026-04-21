FROM python:3.10-slim

WORKDIR /app

# Install system dependencies for torch, scikit-learn, and SBERT
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgomp1 \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
# We do this first to leverage Docker layer caching
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application code
COPY . .

# Ensure model and feedback files exist or will be mounted
# We don't want to bake the retrained model into the image in a real scenario,
# but we need initial files for the service to start if not mounted.
RUN touch feedback_corrections.json

# Expose FastAPI port
EXPOSE 8000

# Run uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
