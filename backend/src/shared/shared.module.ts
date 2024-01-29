import { Global, Module } from '@nestjs/common';
import { CustomErrorInterceptor } from '@shared/interceptors/custom-error.interceptor';

const exportServices = [CustomErrorInterceptor];

@Global()
@Module({
  imports: [],
  providers: [...exportServices],
  exports: [...exportServices]
})
export class SharedModule {}
