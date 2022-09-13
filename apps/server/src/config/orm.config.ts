import { Logger }                        from '@nestjs/common';
import * as dotenv                       from 'dotenv';
import { join }                          from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy }           from 'typeorm-naming-strategies';
import { Product }                       from '../app/api/product/models/product.entity';
import { User }                          from '../app/api/user/models/user.entity';

dotenv.config();

const env = process.env;

// connection string might be needed for production
export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  entities: [Product, User],
  logging: 'all',
  synchronize: env.APP_ENV === 'development',
  namingStrategy: new SnakeNamingStrategy(),
};

const ormCliConfig = {
  migrations: [`${join(process.cwd())}/apps/nap-server/src/migrations/**/*.ts`],
};

const dataSource = new DataSource({
  ...ormConfig,
  ...ormCliConfig,
});

export default dataSource;
if (env.APP_ENV === 'development') Logger.log(ormConfig, 'Typeorm Config');
