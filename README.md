# Simple Todo App - Fullstack

This is a full stack todo application that can be easily run locally. It utilizes NodeJS, ExpressJS, and ReactJS. The database is handled via the node-json-db (local JSON-file based), making the setup super simple.

This app was built with the help of ChatGPT! GenAI is a powerful tool that can help you fast-track development, improve your debugging skills, and vastly improve your learning and knowledge.

## What you can use this app for

1. Learning frontend and backend development via a simple code base example
2. Practicing unit testing with libraries such as jest and React-Testing-Library
3. Practicing automated testing with tools such as Playwright or Cypress

## Setup

```bash
npm run install:all
```

Yep, that's it.

## Getting Started

```bash
npm run start ## Runs the full app and launches a browser window
```

Two JSON files act as the database for the application. A "todo_db.json" file is the running application's database, the regular database used for the application. A "todo_test_db.json" file is used for the server unit tests. Note that it is safe to delete these files if you'd like to start from scratch.

```bash
npm run test ## Runs unit tests within the __tests__ folder in both the client & server repos
```

## Next Steps

Take your learning and practice to the next level by completing the below exercises:

- Review the code by tracing a user's journey (Hint: If you get stuck, use ChatGPT or GitHub Copilot)
- Extend the unit tests for the client and server code
- Setup and use end-to-end and API automtation frameworks to automate the various flows of the application 
    - Extend the application code to include ids for elements, which will make unit testing and end-to-end automation easier
    - Automate critical user flows with a tool such as Playwright or Cypress
- Extend the application with new features or update existing ones