import { IsString, IsInt, IsDateString, IsNotEmpty, Min, Max, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({ description: 'ID del usuario que realiza la reserva', example: 'user-123' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({ description: 'ID de la sala a reservar', example: 'room-456' })
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty({ description: 'Fecha y hora de inicio de la reserva en formato ISO 8601', example: '2024-05-20T09:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @ApiProperty({ description: 'Fecha y hora de fin de la reserva en formato ISO 8601', example: '2024-05-20T10:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  endTime: string;

  @ApiProperty({ description: 'Número de personas que asistirán a la reunión', example: 5, required: false })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  attendees?: number;

  @ApiProperty({ description: 'Título de la reunión', example: 'Reunión de equipo', required: false })
  @IsString()
  @IsOptional()
  title?: string;

  constructor(
    userId: string,
    roomId: string,
    startTime: string,
    endTime: string,
    attendees?: number,
    title?: string
  ) {
    this.userId = userId;
    this.roomId = roomId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.attendees = attendees;
    this.title = title;
  }

  validateTimeOrder(): void {
    if (new Date(this.startTime) >= new Date(this.endTime)) {
      throw new Error('La hora de inicio debe ser anterior a la hora de fin');
    }
  }

  validateAttendeesCapacity(maxCapacity: number): void {
    if (this.attendees && this.attendees > maxCapacity) {
      throw new Error(`La sala no puede albergar más de ${maxCapacity} personas`);
    }
  }
}