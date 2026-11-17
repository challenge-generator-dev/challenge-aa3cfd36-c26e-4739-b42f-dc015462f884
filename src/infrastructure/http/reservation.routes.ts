import { Router, Request, Response } from 'express';
import { ReservationRepository } from '../../domain/ports/reservation.repository';
import { Reservation } from '../../domain/models/reservation.model';
import { CreateReservationDto } from '../../application/dto/create-reservation.dto';
import { UpdateReservationDto } from '../../application/dto/update-reservation.dto';
import { ReservationDto } from '../../application/dto/reservation.dto';

const router = Router();

export function createReservationRoutes(reservationRepository: ReservationRepository) {
  router.post('/reservations', async (req: Request, res: Response) => {
    try {
      const createDto = new CreateReservationDto(
        req.body.userId,
        req.body.roomId,
        req.body.startTime,
        req.body.endTime,
        req.body.attendees,
        req.body.title
      );
      
      createDto.validateTimeOrder();
      
      const reservation: Reservation = {
        id: `reservation-${Date.now()}`,
        userId: createDto.userId,
        roomId: createDto.roomId,
        startTime: new Date(createDto.startTime),
        endTime: new Date(createDto.endTime),
        timeZone: 'UTC',
      };
      
      const created = await reservationRepository.create(reservation);
      const dto = ReservationDto.fromDomain(created);
      res.status(201).json(dto);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      res.status(400).json({ error: message });
    }
  });

  router.get('/reservations', async (req: Request, res: Response) => {
    try {
      const userId = req.query.userId as string;
      const roomId = req.query.roomId as string;
      
      let reservations: Reservation[];
      
      if (userId) {
        reservations = await reservationRepository.findByUserId(userId);
      } else if (roomId) {
        reservations = await reservationRepository.findByRoomId(roomId);
      } else {
        reservations = [];
      }
      
      const dtos = reservations.map(r => ReservationDto.fromDomain(r));
      res.json(dtos);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      res.status(500).json({ error: message });
    }
  });

  router.get('/reservations/:id', async (req: Request, res: Response) => {
    try {
      const reservation = await reservationRepository.findById(req.params.id);
      
      if (!reservation) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }
      
      const dto = ReservationDto.fromDomain(reservation);
      res.json(dto);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      res.status(500).json({ error: message });
    }
  });

  router.put('/reservations/:id', async (req: Request, res: Response) => {
    try {
      const updateDto = new UpdateReservationDto(
        req.body.userId,
        req.body.startTime,
        req.body.endTime,
        req.body.attendees,
        req.body.title,
        req.body.status
      );
      
      if (updateDto.hasChanges()) {
        updateDto.validateTimeOrder();
        
        const updateData: Partial<Reservation> = {};
        
        if (updateDto.userId !== undefined) updateData.userId = updateDto.userId;
        if (updateDto.startTime !== undefined) updateData.startTime = new Date(updateDto.startTime);
        if (updateDto.endTime !== undefined) updateData.endTime = new Date(updateDto.endTime);
        
        const updated = await reservationRepository.update(req.params.id, updateData);
        const dto = ReservationDto.fromDomain(updated);
        res.json(dto);
      } else {
        res.status(400).json({ error: 'No hay cambios para actualizar' });
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      if (message === 'Reserva no encontrada') {
        res.status(404).json({ error: message });
      } else {
        res.status(400).json({ error: message });
      }
    }
  });

  router.delete('/reservations/:id', async (req: Request, res: Response) => {
    try {
      const deleted = await reservationRepository.delete(req.params.id);
      
      if (!deleted) {
        return res.status(404).json({ error: 'Reserva no encontrada' });
      }
      
      res.status(204).send();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      res.status(500).json({ error: message });
    }
  });

  return router;
}