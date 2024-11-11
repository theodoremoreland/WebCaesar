FROM python:3.11-slim-buster

WORKDIR /application

COPY . ./
RUN pip install -r requirements.txt

EXPOSE 5000

CMD [ "python", "application.py" ]