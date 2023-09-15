import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '@src/libs/exceptions';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useValue: AllExceptionsFilter,
    },
  ],
})
export class SharedModule {}
