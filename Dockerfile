# Dockerfile
FROM node:alpine
RUN mkdir -p /usr/src
WORKDIR /usr/src
COPY . /usr/src
#Could also build here to make SSG work from the
#beginning, but Minkube + Docker is messing with me...
RUN npm install
EXPOSE 3000
CMD npm run start
