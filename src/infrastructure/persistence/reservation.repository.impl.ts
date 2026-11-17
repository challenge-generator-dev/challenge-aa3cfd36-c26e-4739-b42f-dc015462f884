import { Injectable } from '@nestjs/common';
import { ReservationRepository } from '../../domain/ports/reservation.repository';
import { Reservation, ReservationModel } from '../../domain/models/reservation.model';

@Injectable()
export class ReservationRepositoryImpl implements ReservationRepository {
  private readonly reservations: Map<string, Reservation> = new Map();

  async create(reservation: Reservation): Promise<Reservation> {
    this.reservations.set(reservation.id, reservation);
    return reservation;
  }

  async findById(id: string): Promise<Reservation | null> {
    return this.reservations.get(id) || null;
  }

  async findOverlappingReservations(
    roomId: string,
    startTime: Date,
    endTime: Date
  ): Promise<Reservation[]> {
    const overlapping: Reservation[] = [];
    
    for (const reservation of this.reservations.values()) {
      if (reservation.roomId !== roomId) {
        continue;
      }

      const existingStart = reservation.startTime;
      const existingEnd = reservation.endTime;
      
      const hasOverlap = startTime < existingEnd && endTime > existingStart;
      
      if (hasOverlap) {
        overlapping.push(reservation);
      }
    }
    
    return overlapping;
  }

  async update(id: string, reservation: Partial<Reservation>): Promise<Reservation> {
    const existing = this.reservations.get(id);
    
    if (!existing) {
      throw new Error('Reserva no encontrada');
    }
    
    const updated: Reservation = {
      ...existing,
      ...reservation,
      id: existing.id,
    };
    
    this.reservations.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.reservations.delete(id);
  }

  async findByUserId(userId: string): Promise<Reservation[]> {
    const userReservations: Reservation[] = [];
    
    for (const reservation of this.reservations.values()) {
      if (reservation.userId === userId) {
        userReservations.push(reservation);
      }
    }
    
    return userReservations;
  }

  async findByRoomId(roomId: string): Promise<Reservation[]> {
    const roomReservations: Reservation[] = [];
    
    for (const reservation of this.reservations.values()) {
      if (reservation.roomId === roomId) {
        roomReservations.push(reservation);
      }
    }
    
    return roomReservations;
  }
}