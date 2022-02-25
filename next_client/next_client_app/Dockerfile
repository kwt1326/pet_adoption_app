FROM node:gallium-alpine3.14
ENV WORKDIRPATH=/app
RUN rm -rf node_modules
WORKDIR $WORKDIRPATH
COPY . $WORKDIRPATH
RUN npm i
RUN npm run build
ENTRYPOINT [ "npm", "run", "start:prod" ]