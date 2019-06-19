FROM node:8.9-alpine
COPY . .
RUN npm install
RUN npm run bun --production
RUN npm install -g serve
CMD serve -s build