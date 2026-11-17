import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
  Inject,
  HttpException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationDto } from './dto/reservation.dto';
import { ReservationService } from '../domain/services/reservation.service';
import { ErrorMapper } from '../infrastructure/error/error.mapper';
import { BusinessError } from '../domain/services/reservation.service';

@ApiTags('Reservations')
@Controller('reservations')
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }),
)
export class ReservationController {
  constructor(
    private readonly reservationService: ReservationService,
    @Inject(ErrorMapper) private readonly errorMapper: ErrorMapper,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reserva de sala' })
  @ApiBody({ type: CreateReservationDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Reserva creada exitosamente',
    type: ReservationDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Datos de reserva inválidos' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'La reserva se solapa con otra existente' })
  async create(@Body() createReservationDto: CreateReservationDto): Promise<ReservationDto> {
    try {
      createReservationDto.validateTimeOrder();
      const reservation = await this.reservationService.createReservation({
        userId: createReservationDto.userId,
        roomId: createReservationDto.roomId,
        startTime: createReservationDto.startTime,
        endTime: createReservationDto.endTime,
        attendees: createReservationDto.attendees || 1,
        title: createReservationDto.title || 'Reserva sin título',
        timeZone: 'UTC',
      });
      return ReservationDto.fromDomain(reservation);
    } catch (error) {
      if (error instanceof BusinessError) {
        const httpError = this.errorMapper.mapBusinessError(error);
        throw new HttpException(httpError.message, httpError.statusCode);
      }
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reserva por su ID' })
  @ApiParam({ name: 'id', description: 'ID único de la reserva', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reserva encontrada',
    type: ReservationDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Reserva no encontrada' })
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ReservationDto> {
    try {
      const reservation = await this.reservationService.getReservation(id);
      if (!reservation) {
        throw new HttpException('Reserva no encontrada', HttpStatus.NOT_FOUND);
      }
      return ReservationDto.fromDomain(reservation);
    } catch (error) {
      if (error instanceof BusinessError) {
        const httpError = this.errorMapper.mapBusinessError(error);
        throw new HttpException(httpError.message, httpError.statusCode);
      }
      throw error;
    }
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las reservas' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de reservas',
    type: [ReservationDto],
  })
  async findAll(): Promise<ReservationDto[]> {
    return [];
  }

  @Get('room/:roomId')
  @ApiOperation({ summary: 'Obtener reservas de una sala específica' })
  @ApiParam({ name: 'roomId', description: 'ID de la sala', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de reservas de la sala',
    type: [ReservationDto],
  })
  async findByRoom(@Param('roomId') roomId: string): Promise<ReservationDto[]> {
    try {
      const reservations = await this.reservationService.getReservationsByRoom(roomId);
      return reservations.map((r) => ReservationDto.fromDomain(r));
    } catch (error) {
      if (error instanceof BusinessError) {
        const httpError = this.errorMapper.mapBusinessError(error);
        throw new HttpException(httpError.message, httpError.statusCode);
      }
      throw error;
    }
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener reservas de un usuario específico' })
  @ApiParam({ name: 'userId', description: 'ID del usuario', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de reservas del usuario',
    type: [ReservationDto],
  })
  async findByUser(@Param('userId') userId: string): Promise<ReservationDto[]> {
    try {
      const reservations = await this.reservationService.getReservationsByUser(userId);
      return reservations.map((r) => ReservationDto.fromDomain(r));
    } catch (error) {
      if (error instanceof BusinessError) {
        const httpError = this.errorMapper.mapBusinessError(error);
        throw new HttpException(httpError.message, httpError.statusCode);
      }
      throw error;
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una reserva existente' })
  @ApiParam({ name: 'id', description: 'ID único de la reserva', type: String })
  @ApiBody({ type: UpdateReservationDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reserva actualizada exitosamente',
    type: ReservationDto,
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Reserva no encontrada' })
  @ApiResponse({ status: HttpStatus.CONFLICT, description: 'La reserva se solapa con otra existente' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateReservationDto: UpdateReservationDto,
  ): Promise<ReservationDto> {
    try {
      if (updateReservationDto.hasChanges()) {
        updateReservationDto.validateTimeOrder();
      }
      const updateData: any = {};
      if (updateReservationDto.userId !== undefined) updateData.userId = updateReservationDto.userId;
      if (updateReservationDto.startTime !== undefined) updateData.startTime = updateReservationDto.startTime;
      if (updateReservationDto.endTime !== undefined) updateData.endTime = updateReservationDto.endTime;
      if (updateReservationDto.attendees !== undefined) updateData.attendees = updateReservationDto.attendees;
      if (updateReservationDto.title !== undefined) updateData.title = updateReservationDto.title;
      if (updateReservationDto.status !== undefined) updateData.status = updateReservationDto.status;

      const reservation = await this.reservationService.updateReservation(id, updateData);
      return ReservationDto.fromDomain(reservation);
    } catch (error) {
      if (error instanceof BusinessError) {
        const httpError = this.errorMapper.mapBusinessError(error);
        throw new HttpException(httpError.message, httpError.statusCode);
      }
      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Eliminar una reserva' })
  @ApiParam({ name: 'id', description: 'ID único de la reserva', type: String })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Reserva eliminada exitosamente',
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Reserva no encontrada' })
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    try {
      const deleted = await this.reservationService.deleteReservation(id);
      if (!deleted) {
        throw new HttpException('Reserva no encontrada', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      if (error instanceof BusinessError) {
        const httpError = this.errorMapper.mapBusinessError(error);
        throw new HttpException(httpError.message, httpError.statusCode);
      }
      throw error;
    }
  }
}