import { Injectable } from '@nestjs/common';
import dotenv from 'dotenv';
import envVar from 'env-var';
import { Config } from './config.interface';

@Injectable()
export class ConfigService {
  private envConfig: Config;

  private loadEnvVariables() {
    dotenv.config();
    this.envConfig = {
      NODE_ENV: envVar.get('NODE_ENV').required().asString(),
      PORT: envVar.get('PORT').default(8339).asPortNumber(),
      MYSQL_HOST: envVar.get('MYSQL_HOST').required().asString(),
      MYSQL_PORT: envVar.get('MYSQL_PORT').required().asPortNumber(),
      MYSQL_USER_ID: envVar.get('MYSQL_USER_ID').required().asString(),
      MYSQL_PASSWORD: envVar.get('MYSQL_PASSWORD').required().asString(),
      MYSQL_DATABASE: envVar.get('MYSQL_DATABASE').required().asString()
    };
  }

  get EnvConfig() {
    if (this.envConfig === undefined) {
      this.loadEnvVariables();
    }
    return this.envConfig;
  }
}
