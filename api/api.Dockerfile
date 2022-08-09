# pull the Node.js Docker image
FROM node:lts

# create the directory inside the container
WORKDIR /usr/src/api

# copy essential files to install dependencies
COPY package*.json .
COPY .babelrc .

# run npm install in our local machine
RUN npm install

# copy the generated modules and all other files to the container
COPY ./src/ ./src

# our app is running on port 5000 within the container, so need to expose it
EXPOSE ${API_PORT}

# the command that starts our app
CMD ["npm", "run", "start:prod"]
