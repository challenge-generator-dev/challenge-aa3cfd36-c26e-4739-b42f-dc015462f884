// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Inject } from '@nestjs/common';
import { ReservationModel, Reservation } from '../models/reservation.model';
import { ReservationRepository } from '../ports/reservation.repository';

export class BusinessError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly details?: Record<string, any>
  ) {
    super(message);
    this.name = 'BusinessError';
  }
}

export class OverlapError extends BusinessError {
  constructor(message: string = 'La reserva se solapa con otra existente') {
    super('OVERLAP_ERROR', message);
    this.name = 'OverlapError';
  }
}

export class InvalidTimeRangeError extends BusinessError {
  constructor(message: string = 'El rango de tiempo es inválido') {
    super('INVALID_TIME_RANGE', message);
    this.name = 'InvalidTimeRangeError';
  }
}

export class ReservationNotFoundError extends BusinessError {
  constructor(message: string = 'Reserva no encontrada') {
    super('NOT_FOUND', message);
    this.name = 'ReservationNotFoundError';
  }
}

@Injectable()
export class ReservationService {
  constructor(@Inject('ReservationRepository') private readonly reservationRepository: ReservationRepository) {}

  async createReservation(data: {
    userId: string;
    roomId: string;
    startTime: string;
    endTime: string;
    timeZone: string;
    attendees?: number;
    title?: string;
  }): Promise<ReservationModel> {
    const startTime = new Date(data.startTime);
    const endTime = new Date(data.endTime);

    if (startTime >= endTime) {
      throw new InvalidTimeRangeError('La hora de inicio debe ser anterior a la hora de fin');
    }

    const existingReservations = await this.reservationRepository.findOverlappingReservations(
      data.roomId,
      startTime,
      endTime
    );

    const reservationData: Reservation = {
      id: '',
      roomId: data.roomId,
      userId: data.userId,
      startTime,
      endTime,
      timeZone: data.timeZone,
    };

    if (!this.validateOverlap(reservationData, existingReservations)) {
      throw new OverlapError('La reserva se solapa con otra existente en la misma sala');
    }

    const created = await this.reservationRepository.create(reservationData);
    return new ReservationModel(created);
  }

  async updateReservation(
    id: string,
    data: {
      userId?: string;
      startTime?: string;
      endTime?: string;
      attendees?: number;
      title?: string;
      status?: string;
    }
  ): Promise<ReservationModel> {
    const existing = await this.reservationRepository.findById(id);
    if (!existing) {
      throw new ReservationNotFoundError(`No se encontró la reserva con ID: ${id}`);
    }

    const startTime = data.startTime ? new Date(data.startTime) : existing.startTime;
    const endTime = data.endTime ? new Date(data.endTime) : existing.endTime;

    if (startTime >= endTime) {
      throw new InvalidTimeRangeError('La hora de inicio debe ser anterior a la hora de fin');
    }

    const updatedData: Partial<Reservation> = {
      id: existing.id,
      roomId: existing.roomId,
      userId: data.userId ?? existing.userId,
      startTime,
      endTime,
      timeZone: existing.timeZone,
    };

    if (data.startTime || data.endTime) {
      const overlapping = await this.reservationRepository.findOverlappingReservations(
        existing.roomId,
        startTime,
        endTime
      );
      const filtered = overlapping.filter(r => r.id !== id);
      
      if (!this.validateOverlap(updatedData as Reservation, filtered)) {
        throw new OverlapError('La reserva se solapa con otra existente');
      }
    }

    const updated = await this.reservationRepository.update(id, updatedData);
    return new ReservationModel(updated);
  }

  async deleteReservation(id: string): Promise<boolean> {
    const existing = await this.reservationRepository.findById(id);
    if (!existing) {
      throw new ReservationNotFoundError(`No se encontró la reserva con ID: ${id}`);
    }
    return await this.reservationRepository.delete(id);
  }

  async getReservation(id: string): Promise<ReservationModel | null> {
    const result = await this.reservationRepository.findById(id);
    return result ? new ReservationModel(result) : null;
  }

  async getReservationsByRoom(roomId: string): Promise<ReservationModel[]> {
    const results = await this.reservationRepository.findByRoomId(roomId);
    return results.map(r => new ReservationModel(r));
  }

  async getReservationsByUser(userId: string): Promise<ReservationModel[]> {
    const results = await this.reservationRepository.findByUserId(userId);
    return results.map(r => new ReservationModel(r));
  }

  validateOverlap(reservation: Reservation, existingReservations: Reservation[]): boolean {
    throw new Error('TODO(reto): validateOverlap');
  }

  private checkTimeZoneOverlap(reservation: Reservation, existing: Reservation): boolean {
    throw new Error('TODO(reto): checkTimeZoneOverlap');
  }

  private convertToUTC(date: Date, timeZone: string): Date {
    const dateStr = date.toISOString();
    const utcDate = new Date(dateStr);
    return utcDate;
  }
}