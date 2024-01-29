import { LoggerConfigService } from '@config/logger-config.service';
import { TypeOrmConfigService } from '@config/typeorm-config.service';
import { ClassSerializerInterceptor, Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpExceptionFilter } from '@shared/filters/http-exception.filter';
import { CustomErrorInterceptor } from '@shared/interceptors/custom-error.interceptor';
import { WinstonModule } from 'nest-winston';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { ConfigModule } from './config/config.module';
import { GameParticipantModule } from './game-participant/game-participant.module';
import { GameRoomModule } from './game-room/game-room.module';
import { GameWinningNumberModule } from './game-winning-number/game-winning-number.module';
import { RepositoryModule } from './repository/repository.module';
import { SharedModule } from './shared/shared.module';
import { SocketModule } from './socket/socket.module';

@Module({
  imports: [
    ConfigModule,
    SharedModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        if (!options) {
          throw new Error('Invalid options passed');
        }
        return addTransactionalDataSource(new DataSource(options));
      }
    }),
    WinstonModule.forRootAsync({
      useClass: LoggerConfigService
    }),
    RepositoryModule,
    GameRoomModule,
    GameWinningNumberModule,
    GameParticipantModule,
    SocketModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        whitelist: true
      })
    },
    { provide: APP_INTERCEPTOR, useClass: CustomErrorInterceptor },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor
    },
    { provide: APP_FILTER, useClass: HttpExceptionFilter }
  ]
})
export class AppModule {}
