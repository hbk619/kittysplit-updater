FROM debian:jessie

# Replace shell with bash so we can source files
RUN rm /bin/sh && ln -s /bin/bash /bin/sh

ENV NVM_DIR /home/root/.nvm
ENV KITTY_DIR /home/root/kittysplit
ENV NVM_SYMLINK_CURRENT=true

RUN apt-get update && apt-get install -y curl

ADD package.json /tmp/package.json
ADD .nvmrc /tmp/.nvmrc

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash && \
    source $NVM_DIR/nvm.sh && \
    cd /tmp && nvm install

RUN source $NVM_DIR/nvm.sh && cd /tmp && nvm use && npm install && npm install -g pm2

RUN mkdir -p $KITTY_DIR && cp -r /tmp/node_modules $KITTY_DIR

WORKDIR $KITTY_DIR
ADD . $KITTY_DIR

ENV SELENIUM_REMOTE_URL=http://selenium:4444/wd/hub
ENV PATH=$PATH:$NVM_DIR/current/bin

ENTRYPOINT ["pm2", "--no-daemon", "start", "kitty.json"]
CMD []
EXPOSE 3000
