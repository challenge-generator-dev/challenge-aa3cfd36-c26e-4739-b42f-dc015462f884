import { Reservation } from '../models/reservation.model';

export interface ReservationRepository {
  /**
   * Crea una nueva reserva en el sistema.
   * @param reservation La reserva a crear.
   * @returns La reserva creada con su ID generado.
   * @throws Error si ocurre un problema de persistencia.
   */
  create(reservation: Reservation): Promise<Reservation>;

  /**
   * Busca una reserva por su ID.
   * @param id El ID de la reserva.
   * @returns La reserva encontrada o null si no existe.
   * @throws Error si ocurre un problema de persistencia.
   */
  findById(id: string): Promise<Reservation | null>;

  /**
   * Busca todas las reservas para una sala en un rango de tiempo.
   * @param roomId El ID de la sala.
   * @param startTime La hora de inicio del rango.
   * @param endTime La hora de fin del rango.
   * @returns Lista de reservas que se solapan con el rango especificado.
   * @throws Error si ocurre un problema de persistencia.
   */
  findOverlappingReservations(roomId: string, startTime: Date, endTime: Date): Promise<Reservation[]>;

  /**
   * Actualiza una reserva existente.
   * @param id El ID de la reserva a actualizar.
   * @param reservation Los datos actualizados de la reserva.
   * @returns La reserva actualizada.
   * @throws Error si la reserva no existe o ocurre un problema de persistencia.
   */
  update(id: string, reservation: Partial<Reservation>): Promise<Reservation>;

  /**
   * Elimina una reserva por su ID.
   * @param id El ID de la reserva a eliminar.
   * @returns true si la reserva fue eliminada, false si no existía.
   * @throws Error si ocurre un problema de persistencia.
   */
  delete(id: string): Promise<boolean>;

  /**
   * Busca todas las reservas de un usuario.
   * @param userId El ID del usuario.
   * @returns Lista de reservas del usuario.
   * @throws Error si ocurre un problema de persistencia.
   */
  findByUserId(userId: string): Promise<Reservation[]>;

  /**
   * Busca todas las reservas para una sala.
   * @param roomId El ID de la sala.
   * @returns Lista de reservas de la sala.
   * @throws Error si ocurre un problema de persistencia.
   */
  findByRoomId(roomId: string): Promise<Reservation[]>;
}