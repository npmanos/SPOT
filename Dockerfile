FROM node:lts

ENV TINI_VERSION=v0.19.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "-g", "--"]

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin
ENV NODE_ENV=production

COPY . /home/node/SPOT

WORKDIR /home/node/SPOT

RUN npm i

EXPOSE 8080

USER 1000

CMD [ "npm", "start" ]
