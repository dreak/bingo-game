import { ConfigService } from '@config/config.service';
import { LoggerConfigService } from '@config/logger-config.service';
import { TypeOrmConfigService } from '@config/typeorm-config.service';
import { Global, Module } from '@nestjs/common';

const exportServices = [ConfigService, TypeOrmConfigService, LoggerConfigService];

@Global()
@Module({
  providers: [...exportServices],
  exports: [...exportServices]
})
export class ConfigModule {}
