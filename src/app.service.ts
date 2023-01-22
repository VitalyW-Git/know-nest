import { Injectable } from '@nestjs/common';
import {ConfigService} from "@nestjs/config";

interface DatabaseConfig {
  REDIS_PORT: string;
}

@Injectable()
export class AppService {
  public envName
  constructor(private readonly configServices: ConfigService) {
    this.envName = this.configServices.get<DatabaseConfig>('DB_HOST')
  }
  getHello(): string {
    return this.envName;
  }
}
