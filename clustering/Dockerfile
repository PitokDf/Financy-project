FROM python:3.10-slim

WORKDIR /app

# Install system dependencies for torch, scikit-learn, and SBERT
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libgomp1 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Set environment variables for offline mode and model cache
ENV SENTENCE_TRANSFORMERS_HOME=/app/model_cache
ENV TRANSFORMERS_OFFLINE=1
ENV HF_HUB_OFFLINE=1

# Pre-download the SBERT models during build
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('intfloat/multilingual-e5-base')"
RUN python -c "from sentence_transformers import SentenceTransformer; SentenceTransformer('intfloat/multilingual-e5-large')"

# Copy the rest of the application code
COPY . .

# Ensure model and feedback files exist or will be mounted
# Create a dedicated directory for persistent data
RUN mkdir -p /app/data && touch /app/data/feedback_corrections.json

# If model exists in the root, copy it to data as a default
# (This handles the case where the volume is empty on first run)
RUN if [ -f classifier_model.joblib ]; then cp classifier_model.joblib /app/data/; fi

# Set environment variable for the code to know where to find data
ENV DATA_DIR=/app/data

# Expose FastAPI port
EXPOSE 8000

# Run uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
