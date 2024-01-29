import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { GenericMessageDto } from '@shared/dto/generic-message.dto';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  async catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const genericMessageDto = new GenericMessageDto(
      typeof exception.getResponse() === 'object'
        ? (exception.getResponse() as any).message
        : exception.getResponse(),
      exception.getStatus()
    );

    response.status(genericMessageDto.status).json(genericMessageDto);
  }
}
