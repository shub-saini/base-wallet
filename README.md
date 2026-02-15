# NextJS DevOps Pipeline

> **Full-stack Next.js application with production-grade infrastructure automation and CI/CD pipeline on Google Cloud Platform**

[![Terraform](https://img.shields.io/badge/IaC-Terraform-623CE4?logo=terraform)](https://www.terraform.io/)
[![Ansible](https://img.shields.io/badge/Config-Ansible-EE0000?logo=ansible)](https://www.ansible.com/)
[![Docker](https://img.shields.io/badge/Container-Docker-2496ED?logo=docker)](https://www.docker.com/)
[![GCP](https://img.shields.io/badge/Cloud-GCP-4285F4?logo=googlecloud)](https://cloud.google.com/)
[![GitHub Actions](https://img.shields.io/badge/CI/CD-GitHub_Actions-2088FF?logo=githubactions)](https://github.com/features/actions)

## 🚀 Project Overview

A demonstration of modern DevOps practices, featuring fully automated infrastructure provisioning, configuration management, and continuous deployment. This project showcases the lifecycle of cloud-native application deployment using standard tools and best practices.

### Infrastructure Stack

| Layer                | Technology            | Purpose                             |
| -------------------- | --------------------- | ----------------------------------- |
| **Application**      | Next.js               | React-based web framework           |
| **Reverse Proxy**    | Nginx                 | Traffic routing & SSL termination   |
| **Containerization** | Docker                | Application isolation & portability |
| **Infrastructure**   | Terraform             | Cloud resource provisioning         |
| **Configuration**    | Ansible               | System configuration & setup        |
| **CI/CD**            | GitHub Actions        | Automated deployment pipeline       |
| **Cloud**            | Google Cloud Platform | Compute infrastructure              |
| **Registry**         | Docker Hub            | Container image storage             |

## ✨ Key Features

- **Infrastructure as Code (IaC)**: Complete GCP infrastructure defined in Terraform
- **Configuration Management**: Automated server setup using Ansible playbooks
- **Zero-Downtime Deployments**: Containerized application with rolling updates
- **Security Best Practices**: SSH key authentication, OS Login, minimal IAM permissions
- **Automated CI/CD**: Push-to-deploy workflow with GitHub Actions
- **Reverse Proxy**: Nginx handling SSL termination and traffic routing
- **Containerization**: Docker multi-stage builds for optimized images

## 🛠️ Technologies

**Frontend & Backend**

- Next.js (React framework)
- Node.js

**DevOps & Infrastructure**

- Terraform (Infrastructure provisioning)
- Ansible (Configuration management)
- Docker & Docker Compose
- GitHub Actions (CI/CD)

**Cloud & Networking**

- Google Cloud Platform (Compute Engine)
- Nginx (Reverse proxy)
- Google OS Login (SSH management)

## 📋 Prerequisites Setup

### 1. SSH Key Configuration

Generate SSH key pair for GCP OS Login authentication:

```bash
ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_app-vm -C "your-email@example.com"
```

### 2. Google Cloud OS Login

Terraform enables OS Login for centralized SSH key management insise google_compute_instance resource block:

```terraform
metadata = {
    enable-oslogin = "TRUE"
  }
```

The Terraform configuration automatically registers your public key:

```terraform
resource "google_os_login_ssh_public_key" "default" {
  project = var.project_id
  user    = data.google_client_openid_userinfo.me.email
  key     = file("~/.ssh/id_app-vm.pub")
}
```

### 3. GCP Service Account

```bash
# Authenticate
gcloud auth login

# Set project
gcloud config set project YOUR_PROJECT_ID

# Create service account with compute permissions
gcloud iam service-accounts create terraform-sa --display-name="Terraform Service Account"

# Generate key
gcloud iam service-accounts keys create ~/gcp-key.json \
    --iam-account=terraform-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com

# Set credentials
export GOOGLE_APPLICATION_CREDENTIALS=~/gcp-key.json
```

## 🚀 Deployment Guide

### Step 1: Infrastructure Provisioning (Terraform)

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

**Provisions:**

- GCP Compute Engine VM instance
- Compute VM Service account for permission
- VPC network and firewall rules
- Static external IP address
- OS Login SSH key registration

### Step 2: Server Configuration (Ansible)

```bash
cd ansible
ansible-playbook -i inventory.ini setup-docker.yml
ansible-playbook -i inventory.ini setup-nginx.yml
```

**Configures:**

- Docker Engine installation
- Nginx reverse proxy setup
- Systemd service configuration

### Step 3: CI/CD Setup (GitHub Actions)

Add the following secrets to your GitHub repository (`Settings → Secrets and variables → Actions`):

| Secret               | Description                                  |
| -------------------- | -------------------------------------------- |
| `DOCKER_USERNAME`    | Docker Hub username                          |
| `DOCKER_PASSWORD`    | Docker Hub access token                      |
| `VM_IP`              | VM external IP address                       |
| `VM_USER`            | SSH username (your GCP email)                |
| `VM_SSH_PRIVATE_KEY` | Contents of `~/.ssh/id_app-vm` (private key) |

The pipeline automatically triggers on push to `main` branch.

## 🔄 CI/CD Pipeline

The GitHub Actions workflow automates the entire deployment process:

```yaml
name: Deploy to GCP

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
      - name: Build Docker image
      - name: Push to Docker Hub
      - name: SSH to GCP VM
      - name: Continously Deploy to GCP VM
```

**Pipeline Stages:**

1. **Build**: Creates optimized Docker image from Next.js app
2. **Push**: Uploads image to Docker Hub registry
3. **Deploy**: SSH to GCP VM and pulls latest image
4. **Restart**: Stops old container, starts new one (zero downtime)

## 🐳 Docker Configuration

Multi-stage Dockerfile for optimized production builds:

```dockerfile
FROM oven/bun:alpine AS builder
# Install dependencies and build

FROM node:18-alpine AS runner
# Production runtime (minimal image)
```

**Optimizations:**

- Multi-stage builds (reduced image size)
- Layer caching for faster builds
- Production-only dependencies

## 🌐 Nginx Reverse Proxy

Nginx configuration routes external traffic (port 80) to the containerized Next.js app (port 3000):

```nginx
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## 📁 Project Structure

```
.
├── .github/
│   └── workflows/
│       └── ci.yaml             # Continous Integration
│       └── cd.yaml             # Continous Deployment
├── terraform/
│   ├── main.tf                 # Infrastructure resources
│   ├── variables.tf            # Input variables
│   ├── outputs.tf              # Output values
│   └── provider.tf             # Provider with remote state
├── ansible/
│   ├── setup-docker.yaml            # Main playbook
│   ├── setup-docker.yaml            # Main playbook
│   ├── inventory.ini               # Inventory
├── app/                        # Next.js application
├── components/                 # React components
├── public/                     # Static assets
├── Dockerfile                  # Container definition
├── docker-compose.yml          # Local development
├── next.config.js              # Next.js config
└── package.json                # Dependencies
```

## 🔒 Security Implementation

- **SSH Key Authentication**: Password-based auth disabled
- **Google OS Login**: Centralized access management via IAM
- **Principle of Least Privilege**: Minimal IAM permissions for service accounts
- **Secrets Management**: Sensitive data stored in GitHub Secrets (not in code)
- **Firewall Rules**: Only necessary ports exposed (22, 80, 443)
- **Container Security**: Non-root user, minimal base image

## 🧪 Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Test Docker build locally
docker build -t nextjs-app .
docker run -p 3000:3000 nextjs-app
```

## 📊 Monitoring & Debugging

```bash
# Check VM status
terraform output vm_external_ip

# View application logs
ssh user@VM_IP
docker logs -f container_name

# Check Nginx status
sudo systemctl status nginx

# View Nginx logs
sudo tail -f /var/log/nginx/access.log
```
