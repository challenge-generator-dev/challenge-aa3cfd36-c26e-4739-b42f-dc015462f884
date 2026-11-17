// TODO(reto): archivo stubbeado; implementa los cuerpos.
export interface Reservation {
  id: string;
  roomId: string;
  userId: string;
  startTime: Date;
  endTime: Date;
  timeZone: string;
  attendees?: number;
  title?: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface RoomModel {
  id: string;
  name: string;
  capacity: number;
}

export interface UserModel {
  id: string;
  email: string;
  name: string;
}

export class ReservationModel {
  private readonly _id: string;
  private readonly _roomId: string;
  private readonly _userId: string;
  private readonly _startTime: Date;
  private readonly _endTime: Date;
  private readonly _timeZone: string;

  constructor(data: Reservation) {
    this.validateTimeRange(data.startTime, data.endTime);
    this.validateTimeZone(data.timeZone);
    
    this._id = data.id;
    this._roomId = data.roomId;
    this._userId = data.userId;
    this._startTime = data.startTime;
    this._endTime = data.endTime;
    this._timeZone = data.timeZone;
  }

  private validateTimeRange(startTime: Date, endTime: Date): void {
    throw new Error('TODO(reto): validateTimeRange');
  }

  private validateTimeZone(timeZone: string): void {
    throw new Error('TODO(reto): validateTimeZone');
  }

  get id(): string {
    return this._id;
  }

  get roomId(): string {
    return this._roomId;
  }

  get userId(): string {
    return this._userId;
  }

  get startTime(): Date {
    return this._startTime;
  }

  get endTime(): Date {
    return this._endTime;
  }

  get timeZone(): string {
    return this._timeZone;
  }

  toPlain(): Reservation {
    throw new Error('TODO(reto): toPlain');
  }
}

export class RoomModelEntity {
  private readonly _id: string;
  private readonly _name: string;
  private readonly _capacity: number;

  constructor(data: RoomModel) {
    this.validateCapacity(data.capacity);
    
    this._id = data.id;
    this._name = data.name;
    this._capacity = data.capacity;
  }

  private validateCapacity(capacity: number): void {
    if (capacity < 1) {
      throw new Error('La capacidad de la sala debe ser al menos 1 persona');
    }
    if (capacity > 10) {
      throw new Error('La capacidad máxima de la sala es de 10 personas');
    }
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get capacity(): number {
    return this._capacity;
  }

  toPlain(): RoomModel {
    return {
      id: this._id,
      name: this._name,
      capacity: this._capacity,
    };
  }
}

export class UserModelEntity {
  private readonly _id: string;
  private readonly _email: string;
  private readonly _name: string;

  constructor(data: UserModel) {
    this.validateEmail(data.email);
    
    this._id = data.id;
    this._email = data.email;
    this._name = data.name;
  }

  private validateEmail(email: string): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('El email del usuario no es válido');
    }
  }

  get id(): string {
    return this._id;
  }

  get email(): string {
    return this._email;
  }

  get name(): string {
    return this._name;
  }

  toPlain(): UserModel {
    return {
      id: this._id,
      email: this._email,
      name: this._name,
    };
  }
}