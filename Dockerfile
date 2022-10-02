# Note: adapted for Quasar

FROM node:16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
RUN npx quasar build -m pwa

FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist/pwa /app
COPY nginx.conf /etc/nginx/nginx.conf