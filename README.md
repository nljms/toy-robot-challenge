# Getting Started With Toy Robot Challenge ![publish-npm-package](https://github.com/nljms/toy-robot-challenge/actions/workflows/deploy.yml/badge.svg) ![publish-npm-package](https://github.com/nljms/toy-robot-challenge/actions/workflows/test.yml/badge.svg)

This is a typescript implementation of the toy robot challenge. This project uses es6 module and is being transpiled by [babel](https://babeljs.io/). I'm using node 14.15.0 in this project so there would be a posibility that you might encounter some error while trying to install the dependecies. You can use [nvm](https://github.com/nvm-sh/nvm)

## Implementation

I've used different architectural patterns in this project.

- Singleton
  - I setup a store which serves as the singe source of truth for this project. Most of the services uses the single instance of `RobotMovementStore`
- Event Sourcing
  - I used a store in this project to persist and rebuild the history of valid command inputs that are handled in this system
- Dependency Injection
  - Although it's not the usual kind of implementation, I am always a fan of dependency injection. In this approach I am free to abstract things and spread it out into different domains.

## Folder structure

```bash
├── README.md
├── jest.config.js
├── package.json
├── src
│   ├── commands
│   │   ├── __tests__
│   │   │   ├── command.spec.ts
│   │   │   ├── parseInstruction.spec.ts
│   │   │   └── readFile.spec.ts
│   │   ├── command.ts
│   │   ├── parseInstruction.ts
│   │   └── readFile.ts
│   ├── domain
│   │   ├── index.ts
│   │   ├── robot.ts
│   │   ├── store.ts
│   │   └── table.ts
│   ├── errors
│   │   ├── InvalidCommandException.ts
│   │   ├── InvalidDirectoryException.ts
│   │   ├── InvalidMovementException.ts
│   │   ├── OutOfBoundsException.ts
│   │   └── index.ts
│   ├── index.ts
│   ├── types
│   │   ├── enum.ts
│   │   ├── index.ts
│   │   └── interface.ts
│   └── utils
│       ├── cli.ts
│       ├── index.ts
│       └── logger.ts
├── tsconfig.json
└── yarn.lock
```

## Start development

There were two arguments needed to run this application.

- `-i [--input]` - uses cli to handle input commands
- `-d [--directory]` - uses `fileDirectory` to read commands inside a readable file.

```bash
# install dependencies
yarn

# running it locally
yarn start -i # or use --input if you want to use it verbosely

# or file based entry
yarn start -d <file-to-path>  # or use --directory if you want to use it verbosely

# run test
yarn test
```

## Deployment

I'm using github workflows to deploy this to npm
