FROM node:15.10-alpine
COPY .env .
COPY package.json .
COPY tsconfig.json .
COPY node_modules .
COPY .next .
EXPOSE 3007
ENV PORT 3007
CMD [ "npm", "start" ]