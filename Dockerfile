FROM python:3.13-alpine

ENTRYPOINT ["sh", "-c"]

WORKDIR /app

COPY . .

RUN pip install -r /backend/requirements.txt && cd ../frontend && npm install && npm run build

CMD ["python", "app.py"]