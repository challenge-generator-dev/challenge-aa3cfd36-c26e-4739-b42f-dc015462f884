// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { BusinessError } from '../../domain/services/reservation.service';

export interface HttpError {
  statusCode: number;
  message: string;
  error: string;
  details?: Record<string, any>;
}

export class ErrorMapper {
  mapBusinessError(error: BusinessError): HttpError {
    throw new Error('TODO(reto): mapBusinessError');
  }

  private mapOverlapError(error: BusinessError): HttpError {
    throw new Error('TODO(reto): mapOverlapError');
  }

  private mapValidationError(error: BusinessError): HttpError {
    throw new Error('TODO(reto): mapValidationError');
  }

  private mapNotFoundError(error: BusinessError): HttpError {
    throw new Error('TODO(reto): mapNotFoundError');
  }

  private mapGenericError(error: BusinessError): HttpError {
    throw new Error('TODO(reto): mapGenericError');
  }

  mapError(error: Error): HttpError {
    return {
      statusCode: 400,
      message: error.message || 'Error de validación',
      error: 'Bad Request',
    };
  }
}