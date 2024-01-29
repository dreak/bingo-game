import { ConfigService } from '@config/config.service';
import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { GameParticipant } from '@repository/mysql/game-participant/game-participant.entity';
import { GameRoom } from '@repository/mysql/game-room/game-room.entity';
import { GameWinningNumber } from '@repository/mysql/game-winning-number/game-winning-number.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions() {
    const config: TypeOrmModuleOptions = {
      type: 'mysql',
      host: this.configService.EnvConfig.MYSQL_HOST,
      port: this.configService.EnvConfig.MYSQL_PORT,
      username: this.configService.EnvConfig.MYSQL_USER_ID,
      password: this.configService.EnvConfig.MYSQL_PASSWORD,
      database: this.configService.EnvConfig.MYSQL_DATABASE,
      entities: [GameParticipant, GameRoom, GameWinningNumber],
      timezone: 'Z',
      logging: this.configService.EnvConfig.NODE_ENV === 'development',
      extra: {
        decimalNumbers: true,
        namedPlaceholders: true
      },
      legacySpatialSupport: false
    };

    return config;
  }
}
