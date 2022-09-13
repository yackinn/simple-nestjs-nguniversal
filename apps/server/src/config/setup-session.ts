import { INestApplication } from '@nestjs/common';
import * as connectRedis    from 'connect-redis';
import * as session         from 'express-session';
import ioredis              from 'ioredis';
import * as passport        from 'passport';

const RedisStore  = connectRedis(session);
const redisClient = new ioredis();

export function setupSession(app: INestApplication) {
  app.use(
    session({
      secret: process.env.COOKIE_SECRET,
      resave: true,
      saveUninitialized: false,
      store: new RedisStore({
        host: process.env.REDIS_HOST,
        client: redisClient,
      }),
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, //1d
      },
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
}
