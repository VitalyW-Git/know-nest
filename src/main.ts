import { AppModule } from '@src/app.module';
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser(process.env.JWT_SECRET));
  const logger = app.get(Logger);
  console.log({ secret: process.env.JWT_SECRET });

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
  logger.log(`Application listening at ${await app.getUrl()}`);
}
bootstrap();
