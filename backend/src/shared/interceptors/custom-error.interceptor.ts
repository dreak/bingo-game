import {
  BadRequestException,
  CallHandler,
  ConflictException,
  ExecutionContext,
  HttpException,
  Injectable,
  NestInterceptor,
  NotFoundException
} from '@nestjs/common';
import { AlreadyExistsError } from '@shared/exceptions/already-exists.error';
import { InvalidParameterError } from '@shared/exceptions/invalid-parameter.error';
import { NoContentError } from '@shared/exceptions/no-content.error';
import { NotFoundError } from '@shared/exceptions/not-found.error';
import { catchError } from 'rxjs';

@Injectable()
export class CustomErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      catchError((error) => {
        // convert custom error to http exception
        switch (error.constructor) {
          case NotFoundError:
            throw new NotFoundException(error.message);
          case AlreadyExistsError:
            throw new ConflictException(error.message);
          case InvalidParameterError:
            throw new BadRequestException(error.message);
          case NoContentError:
            throw new HttpException(error.message, 204);
        }
        throw error;
      })
    );
  }
}
