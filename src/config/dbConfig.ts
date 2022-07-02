import {registerAs} from '@nestjs/config';
export default registerAs('database', () => (
  {
    type: 'mysql',
    logging: true,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    database: process.env.DB_DATABASE,
    password:process.env.DB_PASSWORD,
    entities: ["dist/**/**.entity{.ts,.js}"],
    synchronize:true,
    bigNumberStrings: false,

  }
))
