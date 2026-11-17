import { IsString, IsInt, IsDateString, IsOptional, Min, Max } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateReservationDto {
  @ApiProperty({ description: 'ID del usuario que realiza la reserva', example: 'user-123', required: false })
  @IsString()
  @IsOptional()
  userId?: string;

  @ApiProperty({ description: 'Fecha y hora de inicio de la reserva en formato ISO 8601', example: '2024-05-20T09:00:00Z', required: false })
  @IsDateString()
  @IsOptional()
  startTime?: string;

  @ApiProperty({ description: 'Fecha y hora de fin de la reserva en formato ISO 8601', example: '2024-05-20T10:00:00Z', required: false })
  @IsDateString()
  @IsOptional()
  endTime?: string;

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

  @ApiProperty({ description: 'Estado de la reserva', example: 'confirmed', required: false })
  @IsString()
  @IsOptional()
  status?: string;

  constructor(
    userId?: string,
    startTime?: string,
    endTime?: string,
    attendees?: number,
    title?: string,
    status?: string
  ) {
    this.userId = userId;
    this.startTime = startTime;
    this.endTime = endTime;
    this.attendees = attendees;
    this.title = title;
    this.status = status;
  }

  validateTimeOrder(): void {
    if (this.startTime && this.endTime && new Date(this.startTime) >= new Date(this.endTime)) {
      throw new Error('La hora de inicio debe ser anterior a la hora de fin');
    }
  }

  validateAttendeesCapacity(maxCapacity: number): void {
    if (this.attendees && this.attendees > maxCapacity) {
      throw new Error(`La sala no puede albergar más de ${maxCapacity} personas`);
    }
  }

  hasChanges(): boolean {
    return (
      this.userId !== undefined ||
      this.startTime !== undefined ||
      this.endTime !== undefined ||
      this.attendees !== undefined ||
      this.title !== undefined ||
      this.status !== undefined
    );
  }
}