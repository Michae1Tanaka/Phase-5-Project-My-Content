# Flatiron School Phase 5 Project: My Content

## Introduction

Welcome to My Content, a web-based platform designed for content management. Leveraging the power of React, Flask, SQLAlchemy, and various other tools, users can seamlessly manage and access content that's both safe and informative.

## Frontend Installation

If you haven't already, start by cloning the repository to your local machine:

```bash
 git clone git@github.com:Michae1Tanaka/Phase-5-Project-My-Content.git
```

After cloning, you should see a directory named `Phase-5-Project-My-Content`. This will be referred to as the "root directory" throughout this guide.

### Prerequisites:

- **Node.js and npm**: Before starting the installation process, ensure that you have both Node.js and npm (Node Package Manager) installed on your local machine.
  - To verify if you have Node.js installed, open your terminal and run:
    ```bash
    node -v
    ```
  - To verify if you have npm installed, run:
    ```bash
    npm -v
    ```
  - If not installed, you can get both Node.js and npm by downloading them from the [official Node.js website](https://nodejs.org/). Follow the instructions there to install them.

### Setting Up the Frontend:

1. **Navigate to the Root Directory**:
   If you aren't already in the root directory (`Phase-5-Project-My-Content`), navigate into it using the terminal:

   ```bash
   cd path_to_directory/Phase-5-Project-My-Content
   ```

2. **Access the Frontend Directory**:
   The frontend code is housed inside a directory named `client`. Navigate to it:

   ```bash
   cd client
   ```

3. **Install Necessary Packages and Dependencies**:
   To ensure that the frontend runs without issues, you'll need to install all necessary packages and libraries. This can be done using npm:

   ```bash
   npm install
   ```

   This command reads the `package.json` file in the `client` directory and installs all the required packages for the project.

4. **Launching the Frontend Development Server**:
   Now that everything's set up, you can start the local development server with the following command:
   ```bash
   npm start
   ```
   Once executed, your default web browser should automatically open and navigate to `http://localhost:3000`. If this doesn't happen automatically, you can manually open your browser and enter the URL.

That's it! The frontend should be running, and you can now view the project in your browser. As you make changes to the code, the browser will automatically reload to reflect those changes, thanks to the magic of React's development server.

## Backend Installation

### Prerequisites:

- **Python**: The backend of this project is written in Python. Ensure you have Python installed on your machine.

  - To verify if Python is installed, open your terminal and run:
    ```bash
    python --version
    ```
  - If Python isn't installed, download it from the [official Python website](https://www.python.org/downloads/).

- **pip**: `pip` is a package installer for Python. It's used to install necessary libraries and dependencies.

  - To verify if pip is installed:
    ```bash
    pip --version
    ```
  - If not installed, pip usually gets installed with Python. If for some reason it's not available, you can [install pip from here](https://pip.pypa.io/en/stable/installation/).

- **pipenv**: This project uses pipenv to manage dependencies and virtual environments.
  - To install pipenv, run:
    ```bash
    pip install pipenv
    ```

### Setting Up the Backend:

1. **Navigate to the Root Directory**:
   If you aren't already in the root directory (`Phase-5-Project-My-Content`), navigate into it using the terminal.

2. **Access the Backend Directory**:
   The backend code is inside a directory named `server`. Navigate to it:

   ```bash
   cd server
   ```

3. **Set Up a Virtual Environment**:
   It's a best practice to set up a virtual environment for your project. This ensures that the dependencies of different projects don't interfere with each other. Set it up with pipenv:

   ```bash
   pipenv shell
   ```

   This command creates and activates a new virtual environment for the project.

4. **Install Necessary Packages and Dependencies**:
   Now install the necessary libraries and packages required for the project:

   ```bash
   pipenv install
   ```

   This will install all dependencies specified in the `Pipfile` of the `server` directory.

5. **Database Setup**:
   The project uses SQLAlchemy with SQLite for the database. First, initialize the database with the migrations:

   ```bash
   flask db upgrade
   ```

   This command creates an SQLite database in the `server` directory, sets up all tables and relationships.

6. **Starting the Backend Development Server**:
   With everything set up, you can now run the backend development server:
   ```bash
   flask run
   ```
   This will start the backend server. By default, it will run on `http://localhost:5555`.

You now have both the frontend and backend running locally! As you interact with the frontend, it will make API calls to your local backend server.

## Resetting the Database to Initial State:

If you want to reset the database to its initial state (i.e., remove all data and start fresh), follow these steps:

1. **Ensure You're in the Backend Directory**:
   If not already in the `server` directory, navigate to it using the terminal.

2. **Run the Reset Script**:
   The project includes a script that wipes the current database and reinitialize it. To execute this script, run:

   ```bash
   python reset_db.py
   ```

   This command will drop the current database, recreate it, and apply initial migrations.

3. **(Optional) Seed Initial Data**:
   If you have a seeding script that populates the fresh database with initial data, run it now.

   ```bash
   python seed_db.py
   ```

   This command will populate the database with seed data, providing you with initial content to work with.

4. **(Optional) Test User**:
   I have created a test user so when the front and back end are up and running head to the login screen and the username will be 'potatoes' and password is also 'potatoes'. I was eating some potatoes when building this part so that's why the username and password are super secure! Please if you're going to create an account do not use a password you already use. Use something generic as I'm sure there are loopholes to get passwords.

## Frontend Dependencies

- **@emotion/react**: [![version](https://img.shields.io/badge/version-11.11.1-blue)](https://emotion.sh/docs/@emotion/react)
- **@emotion/styled**: [![version](https://img.shields.io/badge/version-11.11.0-blue)](https://emotion.sh/docs/@emotion/styled)
- **@mui/icons-material**: [![version](https://img.shields.io/badge/version-5.14.11-blue)](https://mui.com/components/icons/)
- **@mui/material**: [![version](https://img.shields.io/badge/version-5.14.11-blue)](https://mui.com/)
- **@testing-library/jest-dom**: [![version](https://img.shields.io/badge/version-5.17.0-blue)](https://github.com/testing-library/jest-dom)
- **@testing-library/react**: [![version](https://img.shields.io/badge/version-13.4.0-blue)](https://testing-library.com/docs/react-testing-library/intro/)
- **@testing-library/user-event**: [![version](https://img.shields.io/badge/version-13.5.0-blue)](https://github.com/testing-library/user-event)
- **formik**: [![version](https://img.shields.io/badge/version-2.4.5-blue)](https://formik.org/)
- **react**: [![version](https://img.shields.io/badge/version-18.2.0-blue)](https://reactjs.org/docs/getting-started.html)
- **react-dom**: [![version](https://img.shields.io/badge/version-18.2.0-blue)](https://reactjs.org/docs/react-dom.html)
- **react-router-dom**: [![version](https://img.shields.io/badge/version-6.16.0-blue)](https://reactrouter.com/web/guides/quick-start)
- **react-scripts**: [![version](https://img.shields.io/badge/version-5.0.1-blue)](https://create-react-app.dev/docs/getting-started/)
- **web-vitals**: [![version](https://img.shields.io/badge/version-2.1.4-blue)](https://web.dev/vitals/)
- **yup**: [![version](https://img.shields.io/badge/version-1.3.1-blue)](https://jquense.github.io/yup/)

## Credits

A huge thank you to all the maintainers and contributors of these packages for making our development process smooth and efficient.

# Contributor's Guide

I encourage any contributions to My Content. Anything and everything is appreciated. Here are some guidelines to follow if you'd like to contribute:

1. **Fork and Clone the Repository**:
   Begin by following the instructions in the [Frontend Installation](#frontend-installation) portion of the README.md. Be sure to check that your fork is the "origin" remote with `git remote -v`. If you do not see an "origin" remote, you can add it using `git remote add origin https://github.com<your-username>/phase-2-project-fitness-tracker-app-frontend.git`. Replace `<your-username>` with your GitHub username.
2. **Set up Development Environment**:
   After forking and cloning the repository, contributors should create a new branch on which they can make their changes. This can be done using the command git checkout -b <branch-name>. Replace <branch-name> with a name that describes the feature or bugfix the contributor will be working on. In addition, contributors may need to install any necessary dependencies for the project using `pipenv install`.
3. **Work on Your Own Feature or a Bug fix**:
   Contributors should pick a feature to add or a bug to fix. Ideally, this should be something that they've discussed with myself to ensure it's something the project needs. Contributors may want to create a detailed plan or outline for how they're going to implement the feature or fix the bug to keep themselves organized and ensure they've thought through the problem.
4. **Make Changes in Your Local Repo**:
   After picking a feature or bugfix and planning their approach, contributors should make the changes in their local copy of the repository. This might involve adding new files or modifying existing ones.
5. **Commit your changes**:
   As contributors make changes, they should regularly commit these changes to their branch. Each commit should be a logical chunk of work and should include a clear, concise message that describes the change. This can be done using the command git commit -m "Your descriptive message here".
6. **Push Your Changes to Your Fork**:
   Once they've made their changes and committed them to their branch, contributors should push their branch to their fork of the repository on GitHub. This can be done using the command git push origin <branch-name>.
7. **Begin the Pull Request**:
   After pushing their changes to GitHub, contributors can start a pull request on the original repository. To do this, they should navigate to their fork of the repository on GitHub, switch to their branch, and click the "New pull request" button.
8. **Create the Pull Request**:
   When creating the pull request, contributors should provide a title and description that explains what the changes do and why they should be included in the project. Once they've filled out this information, they can click "Create pull request". Then, it's up to me to review the changes and decide whether to merge them into the project.

## License

MIT License

Copyright (c) [2023] [Michael Tanaka]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
