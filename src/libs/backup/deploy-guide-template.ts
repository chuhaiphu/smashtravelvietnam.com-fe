export const generateDeployGuide = (domainName: string = 'smashtravelvietnam.com') => `
# 🚀 HƯỚNG DẪN DEPLOY - ${domainName.toUpperCase()}

> **Backup Date**: ${new Date().toISOString()}
> **Domain**: ${domainName}

---

## 📋 MỤC LỤC

1. [Yêu cầu hệ thống](#1-yêu-cầu-hệ-thống)
2. [Cài đặt Docker & Docker Compose](#2-cài-đặt-docker--docker-compose)
3. [Tạo thư mục và upload files](#3-tạo-thư-mục-và-upload-files)
4. [Cấu hình Environment Variables](#4-cấu-hình-environment-variables)
5. [Deploy ứng dụng](#5-deploy-ứng-dụng)
6. [Cấu hình Nginx](#6-cấu-hình-nginx)
7. [Cài đặt SSL với Let's Encrypt](#7-cài-đặt-ssl-với-lets-encrypt)
8. [Các lệnh hữu ích](#8-các-lệnh-hữu-ích)
9. [Troubleshooting](#9-troubleshooting)

---

## 1. Yêu cầu hệ thống

- **OS**: Ubuntu 20.04 LTS hoặc mới hơn
- **RAM**: Tối thiểu 2GB (khuyến nghị 4GB)
- **CPU**: 2 cores trở lên
- **Disk**: 20GB trở lên
- **Ports**: 80, 443, 2222 (SSH), 5432 (PostgreSQL - nếu cần truy cập từ xa)

---

## 2. Cài đặt Docker & Docker Compose

### 2.1. Cập nhật hệ thống

\`\`\`bash
sudo apt update && sudo apt upgrade -y
\`\`\`

### 2.2. Cài đặt Docker

\`\`\`bash
# Cài đặt Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Thêm user hiện tại vào group docker (để chạy docker không cần sudo)
sudo usermod -aG docker $USER

# Đăng xuất và đăng nhập lại để áp dụng thay đổi
exit
\`\`\`

### 2.3. Kiểm tra Docker

\`\`\`bash
docker --version
docker compose version
\`\`\`

---

## 3. Tạo thư mục và upload files

### 3.1. Tạo thư mục ứng dụng

\`\`\`bash
sudo mkdir -p /opt/apps/${domainName}
sudo chown -R $USER:$USER /opt/apps/${domainName}
cd /opt/apps/${domainName}
\`\`\`

### 3.2. Upload các files từ backup

Upload các files sau vào thư mục \`/opt/apps/${domainName}\`:
- \`Dockerfile\`
- \`docker-compose.yml\`
- \`start.sh\`

Hoặc sử dụng \`scp\` từ máy local:

\`\`\`bash
# Từ máy local
scp -P 2222 Dockerfile docker-compose.yml start.sh user@your-vps-ip:/opt/apps/${domainName}/
\`\`\`

### 3.3. Tạo thư mục backups

\`\`\`bash
mkdir -p /opt/apps/${domainName}/backups
\`\`\`

---

## 4. Cấu hình Environment Variables

### 4.1. Cách 1: Sử dụng file .env (cho test local)

\`\`\`bash
cd /opt/apps/${domainName}
nano .env
\`\`\`

Nội dung file \`.env\`:

\`\`\`env
# Docker
DOCKER_IMAGE=your-dockerhub-username/${domainName}
DOCKER_CONTAINER_NAME=nextjs_app
VERSION=1.0.0-alpha

# PostgreSQL
POSTGRES_DB=smashtravel_db
POSTGRES_USER=smashtravel_user
POSTGRES_PASSWORD=your_secure_password_here

# Admin accounts
ADMIN_EMAIL=admin@${domainName}
ADMIN_PASSWORD=your_admin_password
ADMIN_NAME=Admin

SUPADMIN_EMAIL=supadmin@${domainName}
SUPADMIN_PASSWORD=your_supadmin_password
SUPADMIN_NAME=Super Admin
\`\`\`

### 4.2. Cách 2: Export trực tiếp (cho production với GitHub Actions)

\`\`\`bash
export DOCKER_IMAGE=your-dockerhub-username/${domainName}
export VERSION=1.0.0-alpha
export POSTGRES_DB=smashtravel_db
# ... (các biến khác)
\`\`\`

---

## 5. Deploy ứng dụng

### 5.1. Pull Docker image (nếu đã có trên Docker Hub)

\`\`\`bash
cd /opt/apps/${domainName}

# Login Docker Hub (nếu image là private)
docker login

# Pull và chạy
docker compose pull
docker compose up -d
\`\`\`

### 5.2. Build từ source (nếu chưa có image)

\`\`\`bash
cd /opt/apps/${domainName}

# Build image
docker build -t ${domainName}:latest .

# Update docker-compose.yml để sử dụng image local
# Thay đổi: image: \${DOCKER_IMAGE}:\${VERSION}
# Thành: image: ${domainName}:latest

docker compose up -d
\`\`\`

### 5.3. Kiểm tra services

\`\`\`bash
docker compose ps
docker compose logs -f app
\`\`\`

---

## 6. Cấu hình Nginx

### 6.1. Cài đặt Nginx

\`\`\`bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
\`\`\`

### 6.2. Tạo file cấu hình Nginx

\`\`\`bash
sudo nano /etc/nginx/sites-available/${domainName}
\`\`\`

Nội dung:

\`\`\`nginx
# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name ${domainName} www.${domainName};
    
    # For Let's Encrypt verification
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }
    
    location / {
        return 301 https://$host$request_uri;
    }
}

# HTTPS Server
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name ${domainName} www.${domainName};

    # SSL certificates (will be added by Certbot)
    ssl_certificate /etc/letsencrypt/live/${domainName}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${domainName}/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Proxy settings
    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 86400;
    }

    # Static files caching
    location /_next/static {
        proxy_pass http://localhost:3001;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, immutable";
    }

    location /static {
        proxy_pass http://localhost:3001;
        proxy_cache_valid 200 365d;
        add_header Cache-Control "public, max-age=31536000";
    }
}
\`\`\`

### 6.3. Kích hoạt site

\`\`\`bash
# Tạo symbolic link
sudo ln -s /etc/nginx/sites-available/${domainName} /etc/nginx/sites-enabled/

# Xóa default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Kiểm tra cấu hình
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
\`\`\`

---

## 7. Cài đặt SSL với Let's Encrypt

### 7.1. Cài đặt Certbot

\`\`\`bash
sudo apt install certbot python3-certbot-nginx -y
\`\`\`

### 7.2. Lấy SSL Certificate

> ⚠️ **Quan trọng**: Đảm bảo domain đã trỏ về IP của VPS trước khi chạy lệnh này!

\`\`\`bash
# Cho domain chính
sudo certbot --nginx -d ${domainName} -d www.${domainName}
\`\`\`

Trong quá trình cài đặt:
1. Nhập email của bạn
2. Đồng ý Terms of Service
3. Chọn có/không nhận email từ EFF
4. Certbot sẽ tự động cấu hình Nginx

### 7.3. Kiểm tra auto-renewal

\`\`\`bash
# Test auto-renewal
sudo certbot renew --dry-run

# Kiểm tra cronjob
sudo systemctl status certbot.timer
\`\`\`

### 7.4. Thủ công renew (nếu cần)

\`\`\`bash
sudo certbot renew
sudo systemctl reload nginx
\`\`\`

---

## 8. Các lệnh hữu ích

### 8.1. Docker Commands

\`\`\`bash
# Xem logs
docker compose logs -f app
docker compose logs -f db

# Restart services
docker compose restart app

# Stop tất cả
docker compose down

# Rebuild và restart
docker compose up -d --build

# Vào container
docker exec -it nextjs_app sh
docker exec -it nextjs_postgres psql -U smashtravel_user -d smashtravel_db
\`\`\`

### 8.2. Database Backup/Restore

\`\`\`bash
# Backup
docker exec nextjs_postgres pg_dump -U smashtravel_user smashtravel_db > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore
docker exec -i nextjs_postgres psql -U smashtravel_user smashtravel_db < backup.sql
\`\`\`

### 8.3. Nginx Commands

\`\`\`bash
# Kiểm tra cấu hình
sudo nginx -t

# Reload
sudo systemctl reload nginx

# Restart
sudo systemctl restart nginx

# Xem logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
\`\`\`

### 8.4. System Monitoring

\`\`\`bash
# Disk usage
df -h

# Memory usage
free -h

# Docker disk usage
docker system df

# Clean Docker
docker system prune -a
\`\`\`

---

## 9. Troubleshooting

### 9.1. Container không start được

\`\`\`bash
# Xem logs chi tiết
docker compose logs app

# Kiểm tra network
docker network ls
docker network inspect app-network
\`\`\`

### 9.2. Database connection failed

\`\`\`bash
# Kiểm tra PostgreSQL container
docker compose logs db

# Kiểm tra database
docker exec -it nextjs_postgres psql -U smashtravel_user -d smashtravel_db -c "SELECT 1;"
\`\`\`

### 9.3. SSL không hoạt động

\`\`\`bash
# Kiểm tra certificate
sudo certbot certificates

# Xóa và tạo lại certificate
sudo certbot delete --cert-name ${domainName}
sudo certbot --nginx -d ${domainName} -d www.${domainName}
\`\`\`

### 9.4. Nginx 502 Bad Gateway

\`\`\`bash
# Kiểm tra app có đang chạy không
docker compose ps

# Kiểm tra port
ss -tlnp | grep 3001

# Restart app
docker compose restart app
\`\`\`

---

## 📞 Liên hệ hỗ trợ

- **Email**: support@${domainName}
- **Website**: https://${domainName}

---

**© ${new Date().getFullYear()} ${domainName} - All rights reserved.**
`;
