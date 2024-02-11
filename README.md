# Person-Manager

## Project Overview

This application is a practical learning experience focused on creating a simple full-stack web application. The primary goal is to provide basic CRUD (Create, Read, Update, Delete) functionality for managing and storing information about individuals. It acts as a digital contact list, enabling users to maintain and organize essential details about people.

## Features

- **Create:** Add a new person's information to the database.
- **Read:** Retrieve and view details of individuals stored in the system.
- **Update:** Modify and update information for existing persons.
- **Delete:** Remove individuals from the database.

## Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - TypeScript
  - React
  - Bootstrap

- **Backend:**
  - C# (ASP.NET Core)
  - MongoDB

## Dependencies
- [MongoDB.Bson](https://www.nuget.org/packages/MongoDB.Bson/) v2.23.1
- [MongoDB.Driver](https://www.nuget.org/packages/MongoDB.Driver/) v2.23.1
- [MongoDB.Driver.Core](https://www.nuget.org/packages/MongoDB.Driver.Core/) v2.23.1
- [MongoRepository](https://www.nuget.org/packages/MongoRepository/) v1.6.11
- [dotnet](https://dotnet.microsoft.com/download/dotnet) v7.0.
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)v7.0.5

## Getting Started

To set up the project locally, follow these steps:

1. First, make sure you have installed all the dependencies mentioned above
2. Clone the repository: `git clone https://github.com/GabrielDineckTremarin/person-manager.git` <br>
3. Navigate to the project directory: `cd person-manager` <br>
4. Set up the frontend by navigating to the ClientApp folder, use the following command: `cd ClientApp`,
then use the command `npm install`, to install the dependencies. After that you just need to run the command `npm run dev` and the frontend should be running already
5. Open Visual Studio, if you have not installed the dependencies, install them
6. Click the `ContactOrganizer.sln` solution
7. Run the project

[Click here to see the live demo](https://contact-maganer-gdt.netlify.app/)
Obs: I have not deployed the backend yet, so it is not connected to a database, the demo is just the frontend part

## License

This project is licensed under the [MIT License](LICENSE.md).




