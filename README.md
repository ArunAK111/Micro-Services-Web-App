# CC_Monolithic_to_Micro_Services

## Overview

This repository showcases the transformation of an e-commerce platform from a monolithic architecture to a microservices-based architecture using the MERN stack. The application was initially built as a single, unified codebase and has now been divided into four distinct, scalable microservices, each encapsulated in Docker and orchestrated using Kubernetes. This enhances scalability, maintainability, and deployment flexibility.

![Architecture](https://github.com/ArunAK111/CC_Monolithic_to_Micro_Services/blob/main/Architecture.jpeg)  <!-- Replace this placeholder image with your actual architecture diagram -->

## Microservices Description

- **Frontend Service**: Manages the user interface and interaction.
- **User Service (UC1)**: Handles user authentication and profile management.
- **Product Service (UC2)**: Manages product inventory, descriptions, and details.
- **Order Service (UC3)**: Processes and tracks orders.

## Technologies Used

- **CI/CD**: For continuous integration and continuous deployment, enhancing the software delivery process.
- **MongoDB**: Database for storing all application data.
- **Express.js**: Backend framework used within Node.js.
- **React.js**: Library for building the user interface.
- **Node.js**: JavaScript runtime for executing the backend in JavaScript.
- **Docker**: For containerizing each microservice.
- **Kubernetes**: For automating deployment, scaling, and operations of application containers.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Docker
- Kubernetes (e.g., Minikube, Docker Desktop)
- Node.js and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/ArunAK111/CC_Monolithic_to_Micro_Services.git
cd CC_Monolithic_to_Micro_Services

# Build Docker Images
## Navigate to each service directory and build Docker images
cd frontend
docker build -t yourdockerhubusername/frontend:latest .
cd ../uc1
docker build -t yourdockerhubusername/uc1:latest .
cd ../uc2
docker build -t yourdockerhubusername/uc2:latest .
cd ../uc3
docker build -t yourdockerhubusername/uc3:latest .

# Deploy with Kubernetes
kubectl apply -f kubernetes.yaml

# Access the Application
kubectl get svc
# Note the external IP and port to access the frontend service
```
## Contributors

- **Arun A Kurali** - [GitHub](https://github.com/ArunAK111)
- **Arnab Karmakar** - [GitHub](https://github.com/arnabk1108)
- **Anurag N Koppal** - [GitHub](https://github.com/anuragnkoppal)
- **Arnav Atrey** - [Github](https://github.com/Arnav-Atrey)

