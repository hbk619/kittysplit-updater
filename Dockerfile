FROM selenium:standalone-firefox:2.46.0

RUN mkdir /opt/kittysplit
ADD . /opt/kittyplit

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash
RUN npm install -g pm2

RUN cd /opt/kittysplit && nvm install && npm install

ENTRYPOINT ["pm2", "start", "/opt/kittysplit/bin/www"]
CMD []