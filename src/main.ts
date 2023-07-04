import { AppModule } from '@src/app.module';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import * as connectRedis from 'connect-redis';
import { createClient } from 'redis';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  // Подключение Redis в качестве базы данных с помощью сеансов
  const RedisStore = connectRedis(session);
  const redisClient: any = createClient({
    url: 'redis://localhost:6379',
  });
  redisClient.on('error', (e) => {
    Logger.error('Could not establish a connection with redis. ' + e);
  });
  redisClient.on('connect', () => {
    Logger.verbose('Connected to redis successfully', 'Bootstrap');
  });
  redisClient.connect().catch(console.error);
  app.use(
    session({
      store: new RedisStore({ client: redisClient, logErrors: true }),
      secret: 'secret-key',
      saveUninitialized: false,
      resave: false,
      cookie: {
        secure: true,
        sameSite: 'strict',
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 3,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}
bootstrap();
