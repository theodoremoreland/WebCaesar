# Web Caesar

## Table of contents

-   [Overview](#overview)
-   [Technologies Used](#technologies-used)
-   [How to run locally](#how-to-run-locally)
    -   [Run on Docker](#run-on-docker)
-   [Screenshots](#screenshots)

## Overview

Encrypt and decrypt text using Caesar's cipher. Supports multiple languages.

_This program was created for a homework assignment at LaunchCode's Lc101 (2018)._

## Technologies Used

-   Python
-   TypeScript
-   JavaScript
-   Flask
-   React
-   HTML
-   CSS
-   Vite
-   Axios
-   Tanstack React Query
-   Docker
-   pyspellchecker
-   react-toastify
-   lodash
-   black

# How to run locally

## Run on Docker

Firstly, confirm that Docker is installed and running. Next confirm that no other application is using port `5000` as port `5000` is needed for the Flask server. If you need to run Flask on an alternative port, you can modify the last line in the `application/application.py` file.

**It is assumed the user is at the root of this project and is using a UNIX style command line environment when referencing the CLI commands below.**

Open terminal at root of this project then move into docker/ directory:

```
cd docker/
```

Build Docker image and start Docker container:

```
docker compose up --build
```

Visit: http://localhost:5000 to use the application.

## Screenshots

WIP
