# First stage for creating ui dist folder
FROM node:22-alpine AS node-base

WORKDIR /application/ui

COPY application/ui/ ./
RUN npm install
RUN npm run build

# Final stage for creating python image that copies over the ui dist folder
FROM python:3.11-slim-buster AS dev

WORKDIR /application

COPY application/application.py ./
COPY application/requirements.txt ./
COPY application/modules ./modules/
RUN pip install --no-cache-dir -r requirements.txt

COPY --from=node-base /application/ui/dist ./ui/dist

EXPOSE 5000

CMD ["gunicorn", "--chdir", "/application", "application:application", "--bind", "0.0.0.0:5000"]
