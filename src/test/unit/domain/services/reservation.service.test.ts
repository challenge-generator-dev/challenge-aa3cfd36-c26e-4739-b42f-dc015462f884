import { Test, TestingModule } from '@nestjs/testing';
import { ReservationService, OverlapError, InvalidTimeRangeError, ReservationNotFoundError } from '../../../../domain/services/reservation.service';
import { ReservationRepository } from '../../../../domain/ports/reservation.repository';
import { Reservation } from '../../../../domain/models/reservation.model';

describe('ReservationService', () => {
  let service: ReservationService;
  let repository: jest.Mocked<ReservationRepository>;

  const mockReservationRepository = {
    create: jest.fn(),
    findById: jest.fn(),
    findOverlappingReservations: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    findByUserId: jest.fn(),
    findByRoomId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: ReservationRepository,
          useValue: mockReservationRepository,
        },
      ],
    }).compile();

    service = module.get<ReservationService>(ReservationService);
    repository = module.get(ReservationRepository);
    jest.clearAllMocks();
  });

  describe('validateOverlap', () => {
    const baseReservation: Reservation = {
      id: 'res-1',
      roomId: 'room-1',
      userId: 'user-1',
      startTime: new Date('2024-05-20T09:00:00'),
      endTime: new Date('2024-05-20T10:00:00'),
      timeZone: 'America/New_York',
    };

    it('debe retornar false cuando no hay reservas existentes', () => {
      const existingReservations: Reservation[] = [];
      const result = service.validateOverlap(baseReservation, existingReservations);
      expect(result).toBe(false);
    });

    it('debe retornar true cuando existe solapamiento directo', () => {
      const existingReservation: Reservation = {
        ...baseReservation,
        id: 'res-2',
        startTime: new Date('2024-05-20T09:30:00'),
        endTime: new Date('2024-05-20T10:30:00'),
      };
      const result = service.validateOverlap(baseReservation, [existingReservation]);
      expect(result).toBe(true);
    });

    it('debe retornar true cuando la nueva reserva contiene completamente una existente', () => {
      const existingReservation: Reservation = {
        ...baseReservation,
        id: 'res-2',
        startTime: new Date('2024-05-20T09:15:00'),
        endTime: new Date('2024-05-20T09:45:00'),
      };
      const result = service.validateOverlap(baseReservation, [existingReservation]);
      expect(result).toBe(true);
    });

    it('debe retornar true cuando la nueva reserva está contenida dentro de una existente', () => {
      const existingReservation: Reservation = {
        ...baseReservation,
        id: 'res-2',
        startTime: new Date('2024-05-20T08:00:00'),
        endTime: new Date('2024-05-20T11:00:00'),
      };
      const result = service.validateOverlap(baseReservation, [existingReservation]);
      expect(result).toBe(true);
    });

    it('debe retornar false cuando las reservas son adyacentes sin solaparse', () => {
      const existingReservation: Reservation = {
        ...baseReservation,
        id: 'res-2',
        startTime: new Date('2024-05-20T10:00:00'),
        endTime: new Date('2024-05-20T11:00:00'),
      };
      const result = service.validateOverlap(baseReservation, [existingReservation]);
      expect(result).toBe(false);
    });

    it('debe retornar false cuando las reservas no se tocan en absoluto', () => {
      const existingReservation: Reservation = {
        ...baseReservation,
        id: 'res-2',
        startTime: new Date('2024-05-20T11:00:00'),
        endTime: new Date('2024-05-20T12:00:00'),
      };
      const result = service.validateOverlap(baseReservation, [existingReservation]);
      expect(result).toBe(false);
    });

    it('debe retornar false cuando solo se tocan en el punto final', () => {
      const existingReservation: Reservation = {
        ...baseReservation,
        id: 'res-2',
        startTime: new Date('2024-05-20T08:00:00'),
        endTime: new Date('2024-05-20T09:00:00'),
      };
      const result = service.validateOverlap(baseReservation, [existingReservation]);
      expect(result).toBe(false);
    });

    it('debe verificar solapamiento solo para la misma sala', () => {
      const differentRoomReservation: Reservation = {
        ...baseReservation,
        id: 'res-2',
        roomId: 'room-2',
        startTime: new Date('2024-05-20T09:30:00'),
        endTime: new Date('2024-05-20T10:30:00'),
      };
      const result = service.validateOverlap(baseReservation, [differentRoomReservation]);
      expect(result).toBe(false);
    });

    it('debe retornar true cuando hay múltiples reservas y una se solapa', () => {
      const nonOverlappingReservation: Reservation = {
        ...baseReservation,
        id: 'res-2',
        startTime: new Date('2024-05-20T14:00:00'),
        endTime: new Date('2024-05-20T15:00:00'),
      };
      const overlappingReservation: Reservation = {
        ...baseReservation,
        id: 'res-3',
        startTime: new Date('2024-05-20T09:30:00'),
        endTime: new Date('2024-05-20T10:30:00'),
      };
      const result = service.validateOverlap(baseReservation, [nonOverlappingReservation, overlappingReservation]);
      expect(result).toBe(true);
    });
  });

  describe('createReservation', () => {
    it('debe crear una reserva cuando no hay solapamientos', async () => {
      const createData = {
        roomId: 'room-1',
        userId: 'user-1',
        startTime: new Date('2024-05-20T09:00:00'),
        endTime: new Date('2024-05-20T10:00:00'),
        timeZone: 'America/New_York',
      };

      repository.findOverlappingReservations.mockResolvedValue([]);
      repository.create.mockResolvedValue({
        id: 'res-new',
        ...createData,
      });

      const result = await service.createReservation(createData);

      expect(repository.findOverlappingReservations).toHaveBeenCalledWith(
        'room-1',
        createData.startTime,
        createData.endTime
      );
      expect(repository.create).toHaveBeenCalled();
      expect(result).toBeDefined();
      expect(result.id).toBe('res-new');
    });

    it('debe lanzar OverlapError cuando hay solapamiento', async () => {
      const createData = {
        roomId: 'room-1',
        userId: 'user-1',
        startTime: new Date('2024-05-20T09:00:00'),
        endTime: new Date('2024-05-20T10:00:00'),
        timeZone: 'America/New_York',
      };

      const existingReservation: Reservation = {
        id: 'res-existing',
        roomId: 'room-1',
        userId: 'user-2',
        startTime: new Date('2024-05-20T09:30:00'),
        endTime: new Date('2024-05-20T10:30:00'),
        timeZone: 'America/New_York',
      };

      repository.findOverlappingReservations.mockResolvedValue([existingReservation]);

      await expect(service.createReservation(createData)).rejects.toThrow(OverlapError);
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('debe lanzar InvalidTimeRangeError cuando startTime es mayor o igual a endTime', async () => {
      const invalidData = {
        roomId: 'room-1',
        userId: 'user-1',
        startTime: new Date('2024-05-20T11:00:00'),
        endTime: new Date('2024-05-20T10:00:00'),
        timeZone: 'America/New_York',
      };

      await expect(service.createReservation(invalidData)).rejects.toThrow(InvalidTimeRangeError);
      expect(repository.create).not.toHaveBeenCalled();
    });

    it('debe lanzar InvalidTimeRangeError cuando startTime es igual a endTime', async () => {
      const invalidData = {
        roomId: 'room-1',
        userId: 'user-1',
        startTime: new Date('2024-05-20T10:00:00'),
        endTime: new Date('2024-05-20T10:00:00'),
        timeZone: 'America/New_York',
      };

      await expect(service.createReservation(invalidData)).rejects.toThrow(InvalidTimeRangeError);
      expect(repository.create).not.toHaveBeenCalled();
    });
  });

  describe('updateReservation', () => {
    it('debe actualizar una reserva cuando no hay solapamientos', async () => {
      const existingReservation: Reservation = {
        id: 'res-1',
        roomId: 'room-1',
        userId: 'user-1',
        startTime: new Date('2024-05-20T09:00:00'),
        endTime: new Date('2024-05-20T10:00:00'),
        timeZone: 'America/New_York',
      };

      const updateData = {
        startTime: new Date('2024-05-20T11:00:00'),
        endTime: new Date('2024-05-20T12:00:00'),
      };

      repository.findById.mockResolvedValue(existingReservation);
      repository.findOverlappingReservations.mockResolvedValue([]);
      repository.update.mockResolvedValue({
        ...existingReservation,
        ...updateData,
      });

      const result = await service.updateReservation('res-1', updateData);

      expect(repository.findById).toHaveBeenCalledWith('res-1');
      expect(repository.findOverlappingReservations).toHaveBeenCalledWith(
        'room-1',
        updateData.startTime,
        updateData.endTime
      );
      expect(repository.update).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('debe lanzar ReservationNotFoundError cuando la reserva no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(
        service.updateReservation('non-existent', { startTime: new Date(), endTime: new Date() })
      ).rejects.toThrow(ReservationNotFoundError);
    });

    it('debe lanzar OverlapError cuando la actualización genera solapamiento', async () => {
      const existingReservation: Reservation = {
        id: 'res-1',
        roomId: 'room-1',
        userId: 'user-1',
        startTime: new Date('2024-05-20T09:00:00'),
        endTime: new Date('2024-05-20T10:00:00'),
        timeZone: 'America/New_York',
      };

      const updateData = {
        startTime: new Date('2024-05-20T09:30:00'),
        endTime: new Date('2024-05-20T10:30:00'),
      };

      const overlappingReservation: Reservation = {
        id: 'res-2',
        roomId: 'room-1',
        userId: 'user-2',
        startTime: new Date('2024-05-20T09:30:00'),
        endTime: new Date('2024-05-20T10:30:00'),
        timeZone: 'America/New_York',
      };

      repository.findById.mockResolvedValue(existingReservation);
      repository.findOverlappingReservations.mockResolvedValue([overlappingReservation]);

      await expect(service.updateReservation('res-1', updateData)).rejects.toThrow(OverlapError);
    });
  });

  describe('deleteReservation', () => {
    it('debe eliminar una reserva existente', async () => {
      const existingReservation: Reservation = {
        id: 'res-1',
        roomId: 'room-1',
        userId: 'user-1',
        startTime: new Date('2024-05-20T09:00:00'),
        endTime: new Date('2024-05-20T10:00:00'),
        timeZone: 'America/New_York',
      };

      repository.findById.mockResolvedValue(existingReservation);
      repository.delete.mockResolvedValue(true);

      const result = await service.deleteReservation('res-1');

      expect(result).toBe(true);
      expect(repository.delete).toHaveBeenCalledWith('res-1');
    });

    it('debe lanzar ReservationNotFoundError cuando la reserva no existe', async () => {
      repository.findById.mockResolvedValue(null);

      await expect(service.deleteReservation('non-existent')).rejects.toThrow(ReservationNotFoundError);
    });
  });

  describe('getReservation', () => {
    it('debe retornar la reserva cuando existe', async () => {
      const existingReservation: Reservation = {
        id: 'res-1',
        roomId: 'room-1',
        userId: 'user-1',
        startTime: new Date('2024-05-20T09:00:00'),
        endTime: new Date('2024-05-20T10:00:00'),
        timeZone: 'America/New_York',
      };

      repository.findById.mockResolvedValue(existingReservation);

      const result = await service.getReservation('res-1');

      expect(result).toBeDefined();
      expect(result?.id).toBe('res-1');
    });

    it('debe retornar null cuando la reserva no existe', async () => {
      repository.findById.mockResolvedValue(null);

      const result = await service.getReservation('non-existent');

      expect(result).toBeNull();
    });
  });

  describe('getReservationsByRoom', () => {
    it('debe retornar las reservas de una sala', async () => {
      const reservations: Reservation[] = [
        {
          id: 'res-1',
          roomId: 'room-1',
          userId: 'user-1',
          startTime: new Date('2024-05-20T09:00:00'),
          endTime: new Date('2024-05-20T10:00:00'),
          timeZone: 'America/New_York',
        },
        {
          id: 'res-2',
          roomId: 'room-1',
          userId: 'user-2',
          startTime: new Date('2024-05-20T14:00:00'),
          endTime: new Date('2024-05-20T15:00:00'),
          timeZone: 'America/New_York',
        },
      ];

      repository.findByRoomId.mockResolvedValue(reservations);

      const result = await service.getReservationsByRoom('room-1');

      expect(result).toHaveLength(2);
      expect(repository.findByRoomId).toHaveBeenCalledWith('room-1');
    });
  });

  describe('getReservationsByUser', () => {
    it('debe retornar las reservas de un usuario', async () => {
      const reservations: Reservation[] = [
        {
          id: 'res-1',
          roomId: 'room-1',
          userId: 'user-1',
          startTime: new Date('2024-05-20T09:00:00'),
          endTime: new Date('2024-05-20T10:00:00'),
          timeZone: 'America/New_York',
        },
      ];

      repository.findByUserId.mockResolvedValue(reservations);

      const result = await service.getReservationsByUser('user-1');

      expect(result).toHaveLength(1);
      expect(result[0].userId).toBe('user-1');
    });
  });
});