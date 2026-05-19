#!/bin/bash
set -e

apt-get update && apt-get upgrade -y

apt-get install -y \
    curl wget git vim ufw fail2ban \
    nginx certbot python3-certbot-nginx \
    docker.io docker-compose-v2 \
    htop tmux jq

systemctl enable docker && systemctl start docker
usermod -aG docker ubuntu

ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable

systemctl enable fail2ban && systemctl start fail2ban

sed -i 's/#PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/#PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
systemctl restart sshd

mkdir -p /opt/lutece-website
chown ubuntu:ubuntu /opt/lutece-website

echo "Cloud-init completed at $(date)" > /var/log/cloud-init-custom.log
