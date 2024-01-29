import { Injectable } from '@nestjs/common';
import { WinstonModuleOptionsFactory } from 'nest-winston';
import winston from 'winston';
import { consoleFormat } from 'winston-console-format';

@Injectable()
export class LoggerConfigService implements WinstonModuleOptionsFactory {
  constructor() {}

  createWinstonModuleOptions() {
    const options: winston.LoggerOptions = {};

    options.format = winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      winston.format.errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
    );

    options.defaultMeta = { service: 'Test' };

    options.transports = [
      new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.padLevels(),
          consoleFormat({
            showMeta: true,
            metaStrip: ['timestamp', 'service'],
            inspectOptions: {
              depth: Infinity,
              colors: true,
              maxArrayLength: Infinity,
              breakLength: 120,
              compact: Infinity
            }
          })
        )
      })
    ];

    return options;
  }
}
