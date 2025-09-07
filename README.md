# E4U (Excerise For You)

[![Node.js](https://img.shields.io/badge/Node.js-v18-green)](https://nodejs.org/)  
[![MongoDB](https://img.shields.io/badge/MongoDB-v6.0-green)](https://www.mongodb.com/)

## Table of Contents

- [Overview](#overview)
- [Project Structure](#project-structure)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

This repository contains the codebase for a web application designed and developed with **3 classmates**. The app allows users to:

- Create and manage personalized **workout profiles**
- Track their exercise routines
- Search for relevant exercises via an **external API**
- View, edit, and delete past workouts

The project demonstrates **full-stack development skills**, including front-end design, back-end server logic, and database integration using **MongoDB**.

---

## Project Structure

| File | Description |
|------|-------------|
| `index.html` | Main landing page |
| `login.html` | User login page |
| `register.html` | User registration page |
| `search.html` | Search exercises via API |
| `track.html` | Track and add workouts |
| `view.html` | View, edit, and delete past workouts |
| `server.js` | Server-side logic for handling requests and pages |
| `package.json` | Node.js dependencies and scripts |
| `Procfile` | Deployment configuration |


---

## Features

- **User Profiles**: Create and manage personalized profiles using MongoDB  
- **Add Workouts**: Log exercises and track progress over time  
- **Search Exercises**: Connects to an API to find relevant exercises  
- **View Past Workouts**: Review previously logged workouts  
- **Edit & Delete**: Modify or remove past workouts as needed  

---

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine  
- MongoDB running locally or through a cloud provider

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ellemadeline/finalproject.git
cd finalproject

### Installation

Install dependencies:

```bash
npm install


### Start the Server

Start the server:

```bash
npm start

## Usage

- Register and log in to create a user profile  
- Add workouts and track your exercises  
- Search for exercises using the integrated API  
- View, edit, or delete past workouts as needed  

---

## Deployment

For deployment, ensure that the `Procfile` is correctly configured for your hosting platform. Common platforms like **Heroku** can use this file to determine how to run your application.


