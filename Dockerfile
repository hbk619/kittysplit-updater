FROM selenium/standalone-firefox:2.46.0

# Replace shell with bash so we can source files
RUN sudo rm /bin/sh && sudo ln -s /bin/bash /bin/sh

ENV NVM_DIR /home/seluser/.nvm
ENV KITTY_DIR /home/seluser/kittysplit
ENV NVM_SYMLINK_CURRENT=true

RUN sudo apt-get update && sudo apt-get install -y curl
RUN mkdir -p $KITTY_DIR && cd $KITTY_DIR && sudo chown -R seluser:seluser .

ADD package.json /tmp/package.json
ADD .nvmrc /tmp/.nvmrc

RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.25.4/install.sh | bash && \
    source $NVM_DIR/nvm.sh && \
    cd /tmp && nvm install

RUN source $NVM_DIR/nvm.sh && cd /tmp && nvm use && npm install && npm install -g pm2

RUN mkdir -p $KITTY_DIR && cp -a /tmp/node_modules $KITTY_DIR

WORKDIR $KITTY_DIR
ADD . $KITTY_DIR

ENV SELENIUM_REMOTE_URL=http://localhost:4444/wd/hub
ENV PATH=$PATH:$NVM_DIR/current/bin

ENTRYPOINT ["pm2", "start", "./bin/www"]
CMD []
EXPOSE 3000