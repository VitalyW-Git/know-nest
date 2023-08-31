import { AppModule } from '@src/app.module';
import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe, HttpStatus } from "@nestjs/common";
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );
  app.use(cookieParser('514d1dd4ccdd1'));
  const logger = app.get(Logger);
  console.log('bootstrap secret', { secret: '514d1dd4ccdd1' });

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
  logger.log(`Application listening at ${await app.getUrl()}`);
}
bootstrap();
