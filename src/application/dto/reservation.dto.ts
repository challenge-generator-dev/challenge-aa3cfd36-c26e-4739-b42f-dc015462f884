import { ApiProperty } from '@nestjs/swagger';

export class ReservationDto {
  @ApiProperty({ description: 'ID único de la reserva', example: 'reservation-789' })
  id: string;

  @ApiProperty({ description: 'ID del usuario que realizó la reserva', example: 'user-123' })
  userId: string;

  @ApiProperty({ description: 'ID de la sala reservada', example: 'room-456' })
  roomId: string;

  @ApiProperty({ description: 'Fecha y hora de inicio de la reserva en formato ISO 8601', example: '2024-05-20T09:00:00Z' })
  startTime: string;

  @ApiProperty({ description: 'Fecha y hora de fin de la reserva en formato ISO 8601', example: '2024-05-20T10:00:00Z' })
  endTime: string;

  @ApiProperty({ description: 'Número de personas que asistirán a la reunión', example: 5 })
  attendees: number;

  @ApiProperty({ description: 'Título de la reunión', example: 'Reunión de equipo' })
  title: string;

  @ApiProperty({ description: 'Estado de la reserva', example: 'confirmed' })
  status: string;

  @ApiProperty({ description: 'Fecha de creación de la reserva en formato ISO 8601', example: '2024-05-19T14:30:00Z' })
  createdAt: string;

  @ApiProperty({ description: 'Fecha de última actualización de la reserva en formato ISO 8601', example: '2024-05-19T14:30:00Z' })
  updatedAt: string;

  constructor(
    id: string,
    userId: string,
    roomId: string,
    startTime: string,
    endTime: string,
    attendees: number,
    title: string,
    status: string,
    createdAt: string,
    updatedAt: string
  ) {
    this.id = id;
    this.userId = userId;
    this.roomId = roomId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.attendees = attendees;
    this.title = title;
    this.status = status;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static fromDomain(reservation: any): ReservationDto {
    return new ReservationDto(
      reservation.id,
      reservation.userId,
      reservation.roomId,
      reservation.startTime.toISOString(),
      reservation.endTime.toISOString(),
      reservation.attendees,
      reservation.title,
      reservation.status,
      reservation.createdAt.toISOString(),
      reservation.updatedAt.toISOString()
    );
  }
}