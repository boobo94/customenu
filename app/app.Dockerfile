# pull the Node.js Docker image
FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# create the directory inside the container
WORKDIR /usr/src/app

# copy essential files to install dependencies
COPY package*.json .
COPY babel.config.js .
COPY .eslintrc.json .
COPY vue.config.js .

# run npm install in our local machine
RUN npm install

# copy the generated modules and all other files to the container
COPY ./src/ ./src

# build app for production with minification
RUN npm run build

# our app is running on port 8003 within the container, so need to expose it
EXPOSE 8003

# the command that starts our app
CMD [ "http-server", "dist", "--port","8003" ]