FROM cmulk/wireguard-docker:buster
# Install wireguard packges
RUN apt update && \
  apt install -y --no-install-recommends ca-certificates nodejs npm curl && \
  update-ca-certificates && \
  apt clean

# install coredns
RUN curl -L https://github.com/coredns/coredns/releases/download/v1.5.1/coredns_1.5.1_linux_amd64.tgz --output coredns.tgz && \
  tar -xzf coredns.tgz && rm -f coredns.tgz && mv coredns /usr/bin/coredns

COPY . .

RUN npm i --production --unsafe-perm

COPY ./coredns_default_corefile /etc/coredns/Corefile
