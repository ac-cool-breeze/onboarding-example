// Update with your config settings.
//# docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -e POSTGRES_USERNAME=postgres -d -p 5432:5432 -v ~/docker/volumes/postgres:/var/lib/postgresql/data postgres

const pg_url = process.env.PG_URL || `postgres://${process.env.PG_USER}:${process.env.APP_DB_ADMIN_PASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PG_DATABASE}`;

module.exports = {

  development: {
    client: 'pg',
    connection: pg_url,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: pg_url,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
