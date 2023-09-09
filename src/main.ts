import { Logger, ValidationPipe, HttpStatus } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@src/app.module';

const bootstrap = async () => {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  const logger = app.get(Logger);
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
  logger.log(`Application listening at ${await app.getUrl()}`);
};

bootstrap();
