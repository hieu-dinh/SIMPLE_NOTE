# syntax=docker/dockerfile:1
FROM python:3.9-slim

WORKDIR /python-docker

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD [ "python3", "-m" , "flask", "run", "--host=0.0.0.0"]

