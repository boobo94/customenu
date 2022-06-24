
# Choose and name our temporary image.
FROM alpine as intermediate
# Add metadata identifying these images as our build containers (this will be useful later!)
# LABEL stage=intermediate

# Take an SSH key as a build argument.
ARG SSH_KEY

# Install dependencies required to git clone.
RUN apk update && \
    apk add --update git && \
    apk add --update openssh

# 1. Create the SSH directory.
RUN mkdir -p /root/.ssh/
# 2. Populate the private key file.
RUN echo "$SSH_KEY" > /root/.ssh/id_rsa
# 3. Set the required permissions.
RUN chmod -R 600 /root/.ssh/
# 4. Add github to our list of known hosts for ssh.
RUN ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts

# inject a datestamp arg which is treated as an environment variable and
# will break the cache for the next RUN command
ARG DATE_STAMP

# Clone a repository
RUN git clone git@github.com:boobo94/customenu.git

# todo: remove this
RUN cd /customenu && \
    git checkout monorepo

## Build Stage ##

# pull the Node.js Docker image
FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

# create the directory inside the container
WORKDIR /usr/src/admin

# copy essential files to install dependencies
COPY --from=intermediate /customenu/admin/package*.json .
COPY --from=intermediate /customenu/admin/babel.config.js .
COPY --from=intermediate /customenu/admin/vue.config.js .

# run npm install in our local machine
RUN npm install

# copy the generated modules and all other files to the container
COPY --from=intermediate /customenu/admin/src/ ./src

# build app for production with minification
RUN npm run build

# our app is running on port 8002 within the container, so need to expose it
EXPOSE 8002

# the command that starts our app
CMD [ "http-server", "dist", "--port","8002" ]