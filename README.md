# madclothes-api

## About The Project

It is a RESTful API for controlling sales of clothing items in a clothes shop
called Madclothes. The goals are using it to study backend development, with
the stack informed below, and build a portfolio.

## Tech Stack

- [Typescript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](https://expressjs.com/pt-br/)
- [TypeORM](https://typeorm.io/#/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jest](https://jestjs.io/)
- [GitHub Actions](https://github.com/features/actions)
- [Docker](https://www.docker.com/)
- [Heroku](https://www.heroku.com/)

## How To Run The Project

### Clone The Repository

```bash
$ git clone https://github.com/iranbrg/madclothes-api.git
$ cd madclothes-api
```

### Install Dependencies

```bash
$ npm install
```

### Set Enviroment Variables

Create a `.env` file in the project's root. Check `.env.example` to see what
needs to be set.

```bash
$ cp .env.example .env
$ vim .env
```

### Setup Containers With `docker-compose`

```bash
$ docker-compose up -d
```

### Run Migrations

```bash
$ npm run typeorm migration:run
```

### Run The Server For Development

```bash
$ npm run dev
```

## Project Progress

In the `main` branch, one can use the stable version of this API whereas in the
`staging` branch are the latest and more updated features.

This project is deployed on Heroku and any client can consume this API. So
checkout:
- [Staging](https://madclothes-api-staging.herokuapp.com/)
- [Production](https://madclothes-api-prod.herokuapp.com/)

To check the current project's stage and the plans for new features, see [TODO.md](./docs/TODO.md)

## Documentation

The documentation for this API can be found [here](https://documenter.getpostman.com/view/17688858/UUxzA7Hg)

A [Potman Collection](./docs/madclothes-api.postman_collection.json) is also available at `docs` directory
