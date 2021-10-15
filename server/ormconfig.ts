module.exports = {
  type: 'postgres',
  host: process.env.DBHOSTNAME,
  port: +process.env.DBPORT,
  username: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DBNAME,
  migrations: ['src/database/migrations/*.js'],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  logging: true,
};
