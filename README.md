# Full-Stack CI/CD Pipeline for a MERN Application

<div align="center">

![Project Banner](https://skillicons.dev/icons?i=nextjs,react,nodejs,express,mongo,docker,githubactions,nginx,digitalocean&perline=9)

</div>

<p align="center">
  A comprehensive, production-grade project demonstrating a complete CI/CD lifecycle for a containerized MERN (MongoDB, Express, React, Next.js) application. This repository showcases the automation of building, testing, and deploying a full-stack web application to a cloud server using Docker and GitHub Actions.
</p>

<p align="center">
  <a href="http://206.189.35.179:3000/">
    <img src="https://img.shields.io/badge/Live%20Demo-Open%20Application-blue?style=for-the-badge&logo=digitalocean" alt="Live Demo">
  </a>
</p>

---

## 🚀 Project Overview: "Code Snippet Vault"

The core application is a "Code Snippet Vault" — a practical tool for developers to save, organize, and retrieve frequently used code snippets. It's built on a modern MERN stack with a professional, user-friendly interface.

### ✨ Key Features

-   **Create, Read, Delete (CRD) Snippets:** Full functionality to manage code snippets.
-   **Project-Based Organization:** Group snippets into different projects (e.g., "E-commerce Site," "Personal Blog").
-   **Dynamic Filtering & Searching:** Instantly filter snippets by project or search by title.
-   **Syntax Highlighting:** Clear and readable code blocks for various languages.
-   **Enhanced UX:** Features like loading states, notifications (toasts), and a "copy to clipboard" function provide a polished user experience.

<br/>

### 🖼️ Application UI Screenshot

<!-- Replace the URL below with your actual screenshot URL -->
![Code Snippet Vault UI](<PASTE_YOUR_UI_SCREENSHOT_URL_HERE>)
_The main interface of the Code Snippet Vault, showcasing the project filter and search functionality._

---

## 🛠️ Tech Stack & Architecture

This project utilizes a modern, industry-standard technology stack to cover the entire development and deployment process.

| Area                  | Technology                                                                                           |
| --------------------- | ---------------------------------------------------------------------------------------------------- |
| **Frontend**          | [**Next.js**](https://nextjs.org/) (React Framework), [**Tailwind CSS**](https://tailwindcss.com/)      |
| **Backend**           | [**Node.js**](https://nodejs.org/), [**Express.js**](https://expressjs.com/)                            |
| **Database**          | [**MongoDB Atlas**](https://www.mongodb.com/atlas) (Cloud Database)                                  |
| **Containerization**  | [**Docker**](https://www.docker.com/) & [**Docker Compose**](https://docs.docker.com/compose/)         |
| **CI/CD**             | [**GitHub Actions**](https://github.com/features/actions)                                              |
| **Cloud Provider**    | [**DigitalOcean**](https://www.digitalocean.com/) (Droplet)                                            |

<br/>

### 🏗️ Architectural Diagram

<!-- This is a placeholder for your architecture diagram image. -->
<!-- Replace the URL below with your actual diagram URL. -->
![Architectural Diagram](https://github.com/karindragimhan49/CodeSnippetVault/issues/1#issue-3180445662)
_High-level overview of the CI/CD workflow from code commit to live deployment._

---

## 🔄 CI/CD Pipeline Explained

The heart of this project is the automated deployment pipeline configured in `.github/workflows/deploy.yml`.

**▶️ Trigger:** The pipeline automatically runs on every `git push` to the `main` branch.

**⚙️ Pipeline Stages:**

1.  **Checkout Code:** The latest code is checked out from the repository.
2.  **Login to Docker Hub:** Securely logs into Docker Hub using encrypted secrets.
3.  **Build Docker Images:** Builds separate, optimized Docker images for the frontend (Next.js) and backend (Node.js) applications.
4.  **Push to Docker Hub:** Tags the newly built images with `:latest` and pushes them to a public Docker Hub repository.
5.  **Deploy via SSH:**
    -   Securely connects to the DigitalOcean Droplet using an SSH key stored in GitHub Secrets.
    -   Pulls the latest images from Docker Hub.
    -   Stops and removes the old running containers to prevent conflicts.
    -   Starts new containers from the updated images, injecting the `MONGO_URI` environment variable into the backend container.

<br/>

### アクション (GitHub Actions) Workflow Screenshot

<!-- Replace the URL below with your actual workflow screenshot URL. -->
![GitHub Actions Workflow](<PASTE_YOUR_GITHUB_ACTIONS_SCREENSHOT_URL_HERE>)
_A successful run of the CI/CD pipeline in the GitHub Actions tab._

---

## 🔧 Local Development & Setup

To run this project on your local machine, you'll need Git, Node.js, and Docker Desktop installed.

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/karindragimhan49/Containerized-Mern-CICD-Pipeline.git
    cd Containerized-Mern-CICD-Pipeline
    ```

2.  **Create Environment Variables:**
    -   Create a `.env` file in the `server/` directory.
    -   Create another `.env` file in the project's **root** directory.
    -   Add your MongoDB Atlas connection string to **both** files:
        ```
        MONGO_URI=your_mongodb_connection_string
        ```

3.  **Run with Docker Compose (Recommended):**
    This method mirrors the production environment.
    ```bash
    docker-compose up --build
    ```
    -   Frontend will be available at `http://localhost:3000`.
    -   Backend API will be available at `http://localhost:5000`.

4.  **Run with Node.js (Traditional Method):**
    ```bash
    # Install all dependencies from the root
    npm install concurrently
    cd server && npm install && cd ../client && npm install
    
    # Run both client and server concurrently from the root directory
    cd ..
    npm run dev
    ```

<br/>

### ☁️ Server Deployment Screenshot

<!-- Replace the URL below with your server screenshot URL. -->
![DigitalOcean Droplet SSH](<PASTE_YOUR_DROPLET_SSH_SCREENSHOT_URL_HERE>)
_Checking the status of running Docker containers on the DigitalOcean Droplet via `docker ps`._

---

## 💡 What I've Learned

This project was a deep dive into the full lifecycle of a modern web application. Key takeaways include:

-   **End-to-end DevOps automation** from code commit to live deployment.
-   The power of **containerization with Docker** to create portable, consistent environments.
-   Implementing a robust **CI/CD pipeline using GitHub Actions** to eliminate manual deployment tasks.
-   **Managing infrastructure** on a cloud provider like DigitalOcean.
-   Securely handling sensitive information like API keys and database credentials using **GitHub Secrets**.
-   Building a **full-featured MERN application** with a focus on professional UI/UX.
