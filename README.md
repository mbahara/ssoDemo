# Single Sign-On Demo

This project demonstrates setting up Keycloak with Docker, integrating MySQL and phpMyAdmin, and configuring a Spring Boot backend with an Angular frontend.

## Setup Keycloak and Database

```bash
docker network create mynetwork
docker run -d --name mysql --network=mynetwork -p 3306:3306 \
    -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=ssoDemo mysql:latest
docker run -d --name phpmyadmin --network=mynetwork \
    -e PMA_HOST=mysql -e PMA_PORT=3306 -p 8080:80 phpmyadmin/phpmyadmin:latest
docker run -it -p 8081:8080 --name mykeycloak -e KEYCLOAK_ADMIN=admin \
    -e KEYCLOAK_ADMIN_PASSWORD=admin123 quay.io/keycloak/keycloak:21.0.2 start-dev
```
Once phpMyAdmin is accessible (in our example via `http://localhost:8080`), we create a user and update the MySQL user credentials in our application's configuration file
(these can be found at resources/application.properties in the Spring Boot project).

## Keycloak Configuration
At this point, we can access Keycloak's admin console, typically at `http://localhost:8081`, and perform the following configuration steps:
1) Create Realm: Set up a new realm named `my-realm` to isolate and manage the configurations for our Angular applications.
2) Clients: `optimization-app` and `simulation-app` with redirect URLs `http://localhost:4201/` and `http://localhost:4202/`
3) Roles and Groups: Inside each client, define roles `admin-optimizer` and `view-optimizer` for `optimization-app`; `admin-simulator` and `view-simulator` for `simulation-app`.
   Additionally, create two groups, `admin` and `user`, and assign appropriate roles to each group using the role mapping feature.
   Filter by clients in the assign role window to simplify this process.
5) User Management: Create two users, set credentials for them, and assign the customer group to one user and the admin group to the other user.

![Bildschirmfoto 2025-01-17 um 19 00 26](https://github.com/user-attachments/assets/6f7976b6-6db8-4e76-b5e5-db9b0d90f028)

Now, with the backend ready and running, we set up the frontend by navigating to each of the Angular project directories (angular-apps) and
running the commands from the following script to install all the necessary dependencies and start one Angular project on the default port 4200 and the other on 4201.
```bash
npm install
ng serve --port 4201 # e.g. optimization-app
ng serve --port 4202 # e.g. simulation-app
```

After a successful setup, we can test the SSO functionality by logging in through one of the Angular applications.
This setup allows us to automatically gain access to another Angular application without needing to log in again, demonstrating the seamless user experience provided by SSO.
Since the setup is kept simple, in case of any display issues post-login, which may arise due to session or cache problems, a simple refresh of the browser using Ctrl + R would be effective to resolve these issues.
