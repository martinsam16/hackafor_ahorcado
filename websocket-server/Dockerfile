FROM node:19.5-alpine

WORKDIR app

COPY . .

RUN npm ci

ENV KAFKA_USER {KAFKA_USER}
ENV KAFKA_PASSWORD {KAFKA_PASSWORD}
ENV TOPIC_PREFIX {TOPIC_PREFIX}

EXPOSE 3000

CMD ["npm", "run", "start"]