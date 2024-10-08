FROM nginx:1.27.2 as base

# https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
ARG TIME_ZONE

RUN mkdir -p /opt/var/cache/nginx && \
    cp -a --parents /usr/lib/nginx /opt && \
    cp -a --parents /usr/share/nginx /opt && \
    cp -a --parents /var/log/nginx /opt && \
    cp -aL --parents /var/run /opt && \
    cp -a --parents /etc/nginx /opt && \
    cp -a --parents /etc/passwd /opt && \
    cp -a --parents /etc/group /opt && \
    cp -a --parents /usr/sbin/nginx /opt && \
    cp -a --parents /usr/sbin/nginx-debug /opt && \
    cp -a --parents /lib/aarch64-linux-gnu/ld-* /opt && \
    cp -a --parents /lib/aarch64-linux-gnu/libpcre2-8.so.* /opt && \
    cp -a --parents /lib/aarch64-linux-gnu/libz.so.* /opt && \
    cp -a --parents /lib/aarch64-linux-gnu/libc* /opt && \
    cp -a --parents /lib/aarch64-linux-gnu/libdl* /opt && \
    cp -a --parents /lib/aarch64-linux-gnu/libpthread* /opt && \
    cp -a --parents /lib/aarch64-linux-gnu/libcrypt* /opt && \
    cp -a --parents /usr/lib/aarch64-linux-gnu/libssl.so.* /opt && \
    cp -a --parents /usr/lib/aarch64-linux-gnu/libcrypto.so.* /opt && \
    cp /usr/share/zoneinfo/${TIME_ZONE:-ROC} /opt/etc/localtime && \
    rm -rf /usr/share/nginx/html

FROM node:20 as build
COPY . /app
WORKDIR /app
RUN corepack enable && yarn install && yarn build

FROM gcr.io/distroless/base-debian12
COPY --from=base /opt /
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80 443

ENTRYPOINT ["nginx", "-g", "daemon off;"]