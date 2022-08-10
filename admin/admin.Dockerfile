# pull the Node.js Docker image
FROM node:lts-alpine as build-stage

# create the directory inside the container
WORKDIR /usr/src/admin

# copy essential files to install dependencies
COPY ./package*.json ./
COPY ./babel.config.js ./
COPY .eslintrc.json ./
COPY ./vue.config.js ./

# run npm install in our local machine
RUN npm install

# copy the generated modules and all other files to the container
COPY ./src/ ./src
COPY ./public/ ./public

# build app for production with minification
RUN npm run build

# execute the production stage
FROM nginx:stable-alpine as production-stage

# copy the config file to the nginx config directory
COPY ./scripts/nginx.conf /etc/nginx/nginx.conf

# remove default nginx index page
RUN rm -rf /usr/share/nginx/html/*

# copy application files to the default nginx index page
COPY --from=build-stage /usr/src/admin/dist /usr/share/nginx/html

# our app is running on port 80 within the container, so need to expose it
EXPOSE 80

# the command that starts our app
CMD ["nginx", "-g", "daemon off;"]