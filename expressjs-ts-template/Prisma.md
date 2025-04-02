# Your Prisma schema was created at prisma/schema.prisma
```shell
npx prisma init
```


# Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started

# Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.

# Run prisma db pull to turn your database schema into a Prisma schema.

# Install and generate Prisma Client 

```shell
npm install @prisma/client
npx prisma generate

```


[PostgreSQL Configuration](https://www.prisma.io/docs/orm/overview/databases/postgresql)


```shell
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/migrations/0_init/migration.sql

npx prisma migrate resolve --applied 0_init
```