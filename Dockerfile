# Base image is version 6-onbuild of codemao-master
FROM registry.srv.codemao.cn:5000/codemao-master:8-onbuild

# Install global npm packages
# NOTE: The versions are hardcoded to allow for cache invalidation

# Download qshell
RUN mkdir /srv/qiniu && \
  curl -o /srv/qiniu/qshell https://ops-files.codemao.cn/qshell && \
  chmod -R +x /srv/qiniu

RUN mkdir /srv/aliyun && \
  curl -o /srv/aliyun/ossutil http://gosspublic.alicdn.com/ossutil/1.6.0/ossutil64 && \
  chmod -R +x /srv/aliyun

# Switch to unprivileged user
# Standard in codemao-master images
USER codemao

# Workdir is unprivileged user home
WORKDIR /usr/src/app

# Install node dependencies
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
COPY .npmrc /usr/src/app
RUN npm install

# Copy application source code
COPY . /usr/src/app/

ARG QN_AKEY=''
ARG QN_SKEY=''
ARG CDNPATH=''

# RUN npm run build
# Entry point
RUN npm run build

RUN if [ "$CDNPATH" = 'qiniu' -a "$QN_AKEY" != '' -a  "$QN_SKEY" != '' ]; \
    then echo "UPLOAD FILES TO QINIU SERVER" \ 
    && /srv/qiniu/qshell account $QN_AKEY $QN_SKEY \ 
    && /srv/qiniu/qshell qupload 2 ./config/qnconfig.json; fi

RUN if [ "$CDNPATH" = 'aliyun' -a "$QN_AKEY" != '' -a  "$QN_SKEY" != '' ]; \
    then echo "UPLOAD FILES TO ALIYUN SERVER"\
    && /srv/aliyun/ossutil config -e oss-cn-hangzhou.aliyuncs.com -i $QN_AKEY -k $QN_SKEY \
    && /srv/aliyun/ossutil cp -f -r ./build oss://static-k12edu-codemao/mlz_classroom/build; fi

EXPOSE 5000

# Entry point
ENTRYPOINT ["npm", "run"]
CMD ["production"]