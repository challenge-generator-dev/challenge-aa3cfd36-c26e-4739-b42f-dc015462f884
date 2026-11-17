# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener el proyecto completo y arrancable. Guarda los archivos que te devuelva en la
carpeta del repo, respetando exactamente las rutas.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Superficie de practica — NO resuelvas

Estos archivos SON el ejercicio de la persona. No los implementes; deja stubs.

- `src/domain/models/reservation.model.ts` — La pieza p3 (Modelado de datos, fase f1) vive aqui: este archivo es su unico dueno (blueprint v2).
- `src/domain/services/reservation.service.ts` — La pieza p2 (Validación de solapamientos con zonas horarias, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).
- `src/infrastructure/error/error.mapper.ts` — La pieza p4 (Mapeo de errores de negocio a HTTP, fase f2) vive aqui: este archivo es su unico dueno (blueprint v2).

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Archivos que la arquitectura del reto declara y no estan

Creálos con implementacion real, en la capa que les corresponde:

- `src/acceptance/f2.test.ts`

## Como saber que terminaste

```bash
npm install --no-audit --no-fund && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Backend, Especialidad Desarrollador, Tecnología Node, Advanced L2

### Brecha de conocimiento
Construye una API REST de reservas de salas de reunion con validacion de solapamientos

### Reto
- Tema: API de reservas de salas
- Seniority: advanced-l2
- Tipo: practical
- Título: Desarrollo de API REST para reservas de salas de reunión
- Tiempo estimado: 8 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Definición de endpoints y modelo de datos — objetivo: Definir los endpoints necesarios y el modelo de datos para las reservas de salas. — entregable (NO resolver): Documento que describe los endpoints y el modelo de datos para las reservas de salas.
- Fase 2: Implementación de la lógica de negocio — objetivo: Implementar la lógica de negocio para validar solapamientos en las reservas. — entregable (NO resolver): Código que implementa la lógica de negocio para validar solapamientos en las reservas de salas.
- Fase 3: Pruebas y refactorización — objetivo: Realizar pruebas unitarias y refactorizar el código si es necesario. — entregable (NO resolver): Código refactorizado con pruebas unitarias que cubren al menos 4 casos de aceptación (2 de ellos de error o borde) para la lógica de negocio.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (entrega de archivos).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Entrega de archivos
Entregá cada archivo con su ruta completa, respetando exactamente la estructura de rutas
indicada por los marcadores: un bloque por archivo, precedido por su ruta. No generes ZIPs
ni archivos adjuntos.
La entrega debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: Entregá los archivos completos al finalizar. No preguntes si el usuario
quiere recibirlos. Simplemente entregalos; No debes desplegar en el chat el resumen de lo que arreglaste, solo entregá los archivos.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del último archivo entregado
No preguntes si el usuario quiere los archivos: simplemente entregalos siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "reto-nest",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "tsc -p tsconfig.json",
    "test": "jest"
  },
  "dependencies": {
    "@nestjs/common": "10.4.22",
    "@nestjs/core": "10.4.22",
    "@nestjs/platform-express": "10.4.22",
    "@nestjs/swagger": "8.1.1",
    "class-transformer": "0.5.1",
    "class-validator": "0.15.1",
    "express": "5.3.0",
    "reflect-metadata": "0.2.2",
    "rxjs": "7.8.2"
  },
  "devDependencies": {
    "@nestjs/testing": "10.4.22",
    "@types/express": "4.17.25",
    "@types/jest": "29.5.14",
    "@types/node": "22.20.5",
    "jest": "29.7.0",
    "ts-jest": "29.2.5",
    "typescript": "5.7.3"
  },
  "jest": {
    "preset": "ts-jest",
    "testEnvironment": "node"
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "moduleResolution": "node",
    "outDir": "dist",
    "strict": true,
    "strictPropertyInitialization": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "forceConsistentCasingInFileNames": true,
    "types": [
      "node",
      "jest"
    ]
  },
  "include": [
    "src"
  ],
  "exclude": [
    "node_modules",
    "dist",
    "_pendiente",
    "tests",
    "test",
    "src/**/*.spec.ts",
    "src/**/*.test.ts"
  ]
}

// === ARCHIVO: src/application/dto/create-reservation.dto.ts ===
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

// === ARCHIVO: src/application/dto/update-reservation.dto.ts ===
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

// === ARCHIVO: src/application/dto/reservation.dto.ts ===
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

// === ARCHIVO: src/domain/ports/reservation.repository.ts ===
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

// === ARCHIVO: src/domain/models/reservation.model.ts ===
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

// === ARCHIVO: src/domain/services/reservation.service.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { Injectable, Inject } from '@nestjs/common';
import { ReservationModel, Reservation } from '../models/reservation.model';
import { ReservationRepository } from '../ports/reservation.repository';

export class BusinessError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly details?: Record<string, any>
  ) {
    super(message);
    this.name = 'BusinessError';
  }
}

export class OverlapError extends BusinessError {
  constructor(message: string = 'La reserva se solapa con otra existente') {
    super('OVERLAP_ERROR', message);
    this.name = 'OverlapError';
  }
}

export class InvalidTimeRangeError extends BusinessError {
  constructor(message: string = 'El rango de tiempo es inválido') {
    super('INVALID_TIME_RANGE', message);
    this.name = 'InvalidTimeRangeError';
  }
}

export class ReservationNotFoundError extends BusinessError {
  constructor(message: string = 'Reserva no encontrada') {
    super('NOT_FOUND', message);
    this.name = 'ReservationNotFoundError';
  }
}

@Injectable()
export class ReservationService {
  constructor(@Inject('ReservationRepository') private readonly reservationRepository: ReservationRepository) {}

  async createReservation(data: {
    userId: string;
    roomId: string;
    startTime: string;
    endTime: string;
    timeZone: string;
    attendees?: number;
    title?: string;
  }): Promise<ReservationModel> {
    const startTime = new Date(data.startTime);
    const endTime = new Date(data.endTime);

    if (startTime >= endTime) {
      throw new InvalidTimeRangeError('La hora de inicio debe ser anterior a la hora de fin');
    }

    const existingReservations = await this.reservationRepository.findOverlappingReservations(
      data.roomId,
      startTime,
      endTime
    );

    const reservationData: Reservation = {
      id: '',
      roomId: data.roomId,
      userId: data.userId,
      startTime,
      endTime,
      timeZone: data.timeZone,
    };

    if (!this.validateOverlap(reservationData, existingReservations)) {
      throw new OverlapError('La reserva se solapa con otra existente en la misma sala');
    }

    const created = await this.reservationRepository.create(reservationData);
    return new ReservationModel(created);
  }

  async updateReservation(
    id: string,
    data: {
      userId?: string;
      startTime?: string;
      endTime?: string;
      attendees?: number;
      title?: string;
      status?: string;
    }
  ): Promise<ReservationModel> {
    const existing = await this.reservationRepository.findById(id);
    if (!existing) {
      throw new ReservationNotFoundError(`No se encontró la reserva con ID: ${id}`);
    }

    const startTime = data.startTime ? new Date(data.startTime) : existing.startTime;
    const endTime = data.endTime ? new Date(data.endTime) : existing.endTime;

    if (startTime >= endTime) {
      throw new InvalidTimeRangeError('La hora de inicio debe ser anterior a la hora de fin');
    }

    const updatedData: Partial<Reservation> = {
      id: existing.id,
      roomId: existing.roomId,
      userId: data.userId ?? existing.userId,
      startTime,
      endTime,
      timeZone: existing.timeZone,
    };

    if (data.startTime || data.endTime) {
      const overlapping = await this.reservationRepository.findOverlappingReservations(
        existing.roomId,
        startTime,
        endTime
      );
      const filtered = overlapping.filter(r => r.id !== id);
      
      if (!this.validateOverlap(updatedData as Reservation, filtered)) {
        throw new OverlapError('La reserva se solapa con otra existente');
      }
    }

    const updated = await this.reservationRepository.update(id, updatedData);
    return new ReservationModel(updated);
  }

  async deleteReservation(id: string): Promise<boolean> {
    const existing = await this.reservationRepository.findById(id);
    if (!existing) {
      throw new ReservationNotFoundError(`No se encontró la reserva con ID: ${id}`);
    }
    return await this.reservationRepository.delete(id);
  }

  async getReservation(id: string): Promise<ReservationModel | null> {
    const result = await this.reservationRepository.findById(id);
    return result ? new ReservationModel(result) : null;
  }

  async getReservationsByRoom(roomId: string): Promise<ReservationModel[]> {
    const results = await this.reservationRepository.findByRoomId(roomId);
    return results.map(r => new ReservationModel(r));
  }

  async getReservationsByUser(userId: string): Promise<ReservationModel[]> {
    const results = await this.reservationRepository.findByUserId(userId);
    return results.map(r => new ReservationModel(r));
  }

  validateOverlap(reservation: Reservation, existingReservations: Reservation[]): boolean {
    throw new Error('TODO(reto): validateOverlap');
  }

  private checkTimeZoneOverlap(reservation: Reservation, existing: Reservation): boolean {
    throw new Error('TODO(reto): checkTimeZoneOverlap');
  }

  private convertToUTC(date: Date, timeZone: string): Date {
    const dateStr = date.toISOString();
    const utcDate = new Date(dateStr);
    return utcDate;
  }
}

// === ARCHIVO: src/infrastructure/error/error.mapper.ts ===
// TODO(reto): archivo stubbeado; implementa los cuerpos.
import { BusinessError } from '../../domain/services/reservation.service';

export interface HttpError {
  statusCode: number;
  message: string;
  error: string;
  details?: Record<string, any>;
}

export class ErrorMapper {
  mapBusinessError(error: BusinessError): HttpError {
    throw new Error('TODO(reto): mapBusinessError');
  }

  private mapOverlapError(error: BusinessError): HttpError {
    throw new Error('TODO(reto): mapOverlapError');
  }

  private mapValidationError(error: BusinessError): HttpError {
    throw new Error('TODO(reto): mapValidationError');
  }

  private mapNotFoundError(error: BusinessError): HttpError {
    throw new Error('TODO(reto): mapNotFoundError');
  }

  private mapGenericError(error: BusinessError): HttpError {
    throw new Error('TODO(reto): mapGenericError');
  }

  mapError(error: Error): HttpError {
    return {
      statusCode: 400,
      message: error.message || 'Error de validación',
      error: 'Bad Request',
    };
  }
}

// === ARCHIVO: src/acceptance/f1.test.ts ===
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

// === ARCHIVO: src/infrastructure/persistence/reservation.repository.impl.ts ===
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

// === ARCHIVO: src/application/reservation.controller.ts ===
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

// === ARCHIVO: src/app.module.ts ===
import { Module } from '@nestjs/common';
import { ReservationController } from './application/reservation.controller';
import { ReservationService } from './domain/services/reservation.service';
import { ReservationRepositoryImpl } from './infrastructure/persistence/reservation.repository.impl';
import { ErrorMapper } from './infrastructure/error/error.mapper';

@Module({
  imports: [],
  controllers: [ReservationController],
  providers: [
    ReservationService,
    {
      provide: 'ReservationRepository',
      useClass: ReservationRepositoryImpl,
    },
    ErrorMapper,
  ],
})
export class AppModule {}

// === ARCHIVO: src/main.ts ===
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Reserva de Salas API')
    .setDescription('API para gestionar reservas de salas de reunión')
    .setVersion('1.0')
    .addTag('Reservations')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Aplicación corriendo en: http://localhost:${port}`);
  console.log(`Documentación Swagger disponible en: http://localhost:${port}/docs`);
}

bootstrap();

// === ARCHIVO: src/test/unit/domain/services/reservation.service.test.ts ===
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

// === ARCHIVO: src/infrastructure/http/reservation.routes.ts ===
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
```
