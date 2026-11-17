import { ReservationModel, RoomModelEntity, UserModelEntity } from '../domain/models/reservation.model';

describe('Fase 1 - Modelado de datos', () => {
  describe('ReservationModel', () => {
    it('should define reservation with required fields', () => {
      const reservationData = {
        id: 'reservation-001',
        roomId: 'room-001',
        userId: 'user-001',
        startTime: new Date('2024-05-20T09:00:00Z'),
        endTime: new Date('2024-05-20T10:00:00Z'),
        timeZone: 'America/New_York',
      };

      const reservation = new ReservationModel(reservationData);

      expect(reservation.id).toBe('reservation-001');
      expect(reservation.roomId).toBe('room-001');
      expect(reservation.userId).toBe('user-001');
      expect(reservation.startTime).toEqual(new Date('2024-05-20T09:00:00Z'));
      expect(reservation.endTime).toEqual(new Date('2024-05-20T10:00:00Z'));
      expect(reservation.timeZone).toBe('America/New_York');
    });

    it('should reject invalid time range', () => {
      const invalidReservationData = {
        id: 'reservation-002',
        roomId: 'room-001',
        userId: 'user-001',
        startTime: new Date('2024-05-20T11:00:00Z'),
        endTime: new Date('2024-05-20T10:00:00Z'),
        timeZone: 'America/New_York',
      };

      expect(() => new ReservationModel(invalidReservationData)).toThrow(
        'La hora de inicio debe ser anterior a la hora de fin'
      );
    });

    it('should include timeZone field', () => {
      const reservationWithoutTimeZone = {
        id: 'reservation-003',
        roomId: 'room-001',
        userId: 'user-001',
        startTime: new Date('2024-05-20T09:00:00Z'),
        endTime: new Date('2024-05-20T10:00:00Z'),
        timeZone: '',
      };

      expect(() => new ReservationModel(reservationWithoutTimeZone)).toThrow(
        'El campo timeZone es obligatorio'
      );
    });

    it('should reject when startTime equals endTime', () => {
      const sameTimeReservation = {
        id: 'reservation-004',
        roomId: 'room-001',
        userId: 'user-001',
        startTime: new Date('2024-05-20T10:00:00Z'),
        endTime: new Date('2024-05-20T10:00:00Z'),
        timeZone: 'UTC',
      };

      expect(() => new ReservationModel(sameTimeReservation)).toThrow(
        'La hora de inicio debe ser anterior a la hora de fin'
      );
    });
  });

  describe('RoomModel', () => {
    it('should define room and user models', () => {
      const roomData = {
        id: 'room-001',
        name: 'Sala de Juntas A',
        capacity: 8,
      };

      const room = new RoomModelEntity(roomData);

      expect(room.id).toBe('room-001');
      expect(room.name).toBe('Sala de Juntas A');
      expect(room.capacity).toBe(8);
    });

    it('should reject room with capacity exceeding limit', () => {
      const roomData = {
        id: 'room-002',
        name: 'Sala Grande',
        capacity: 15,
      };

      expect(() => new RoomModelEntity(roomData)).toThrow(
        'La capacidad máxima de la sala es de 10 personas'
      );
    });

    it('should reject room with zero capacity', () => {
      const roomData = {
        id: 'room-003',
        name: 'Sala Inválida',
        capacity: 0,
      };

      expect(() => new RoomModelEntity(roomData)).toThrow(
        'La capacidad de la sala debe ser al menos 1 persona'
      );
    });
  });

  describe('UserModel', () => {
    it('should create user with valid email', () => {
      const userData = {
        id: 'user-001',
        email: 'juan.perez@empresa.com',
        name: 'Juan Pérez',
      };

      const user = new UserModelEntity(userData);

      expect(user.id).toBe('user-001');
      expect(user.email).toBe('juan.perez@empresa.com');
      expect(user.name).toBe('Juan Pérez');
    });

    it('should reject user with invalid email', () => {
      const userData = {
        id: 'user-002',
        email: 'invalid-email',
        name: 'Usuario Inválido',
      };

      expect(() => new UserModelEntity(userData)).toThrow(
        'El email del usuario no es válido'
      );
    });
  });
});