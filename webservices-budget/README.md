# webservices-budget

This is the backend used in the course 'Web Services'

## TODO

info out of the template will be copypasted later

## Clone the project

TODO

## Start the project

### Development

- create a .env file with this content:

```ini
NODE_ENV=development
PORT=9000
CORS_ORIGIN=["http://localhost:5173"]
CORS_MAX_AGE=10800
DATABASE_URL=mysql://devusr:devpwd@localhost:3307/budget
MYSQL_ROOT_PASSWORD=root
MYSQL_DATABASE=budget
MYSQL_USER=devusr
MYSQL_PASSWORD=devpwd
LOG_LEVELS=["log","error","warn","debug"]
AUTH_JWT_SECRET=eensuperveiligsecretvoorindevelopment
AUTH_HASH_LENGTH=32
AUTH_HASH_TIME_COST=6
AUTH_HASH_MEMORY_COST=65536
AUTH_JWT_EXPIRATION_INTERVAL=3600
AUTH_JWT_AUDIENCE=budget.hogent.be
AUTH_JWT_ISSUER=budget.hogent.be
AUTH_MAX_DELAY=5000
```

You can configure another PORT if this one is not convenient on your system.

- `pnpm install`
- Make sure a `.env` exists (see above)
- Create a database with the name given in the `.env` file
- Migrate the database: `pnpm db:migrate`
- Seed the database: `pnpm db:seed`
- `pnpm start:dev`
