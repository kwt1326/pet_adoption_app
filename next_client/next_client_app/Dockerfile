FROM node:gallium-alpine3.14
ENV PORT=3000
ENV WORKDIRPATH=/app
RUN node --max-old-space-size=1024
RUN rm -rf node_modules
WORKDIR $WORKDIRPATH
COPY . $WORKDIRPATH
RUN npm i
RUN npm run build
ENTRYPOINT [ "npm", "run", "start" ]