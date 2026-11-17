# Desarrollo de API REST para reservas de salas de reunión

El sistema debe permitir a los usuarios reservar salas de reunión, validando que no haya solapamientos en las reservas. Los usuarios pueden ser empleados de la empresa y las salas tienen una capacidad máxima de 10 personas. La API debe manejar errores como intentos de reservar salas ya ocupadas o con capacidad excedida.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | API de reservas de salas |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 8 horas |

## Stack

- **Lenguaje:** TypeScript
- **Framework:** NestJS 10
- **Version:** Node 22

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Tener el proyecto base del reto funcionando en tu máquina: clonar el repositorio, instalar las herramientas y verificar que compila y arranca antes de empezar a practicar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Instala las herramientas para ejecutar el proyecto: Node.js 18+ y npm.
- Clona el repositorio del reto (el enlace viene en la entrega del reto y en la sección "Repositorio del Proyecto" del PDF) y ábrelo en tu IDE.
- Instala las dependencias y compila ejecutando `npm install --no-audit --no-fund && npm run build` en la raíz del repositorio.
- Confirma que el comando termina sin errores: el proyecto arranca y sus pruebas corren.
- Ubica los archivos de práctica: son los que contienen `TODO(reto)` (búscalos en el repositorio). Lee el README.md y el AGENTS.md antes de empezar.

**Entregable:** El proyecto compila/arranca sin errores con `npm install --no-audit --no-fund && npm run build`.

<details>
<summary>Pistas de conocimiento</summary>

- Los archivos con `TODO(reto)` son el ejercicio: el resto del repositorio ya está resuelto y no hace falta tocarlo.
- Si el comando de verificación falla, revisa la versión de las herramientas instaladas antes de modificar código.
- AGENTS.md describe el reto, el comando de verificación y las reglas del repositorio.

</details>

### Fase 1: Definición de endpoints y modelo de datos

**Objetivo:** Definir los endpoints necesarios y el modelo de datos para las reservas de salas.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Identificar los endpoints necesarios para crear, leer, actualizar y eliminar reservas de salas.
- Definir el modelo de datos para las reservas, incluyendo atributos como ID de la reserva, ID de la sala, fecha y hora de inicio y fin, y lista de asistentes.

**Entregable:** Documento que describe los endpoints y el modelo de datos para las reservas de salas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera los métodos HTTP apropiados para cada operación.
- Piensa en cómo representar las relaciones entre las reservas y las salas.

</details>

### Fase 2: Implementación de la lógica de negocio

**Objetivo:** Implementar la lógica de negocio para validar solapamientos en las reservas.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Desarrolla la lógica para validar que no haya solapamientos en las reservas de salas.
- Maneja errores como intentos de reservar salas ya ocupadas o con capacidad excedida.

**Entregable:** Código que implementa la lógica de negocio para validar solapamientos en las reservas de salas.

<details>
<summary>Pistas de conocimiento</summary>

- Considera cómo comparar las fechas y horas de las reservas para detectar solapamientos.
- Piensa en cómo manejar los errores de forma efectiva.

</details>

### Fase 3: Pruebas y refactorización

**Objetivo:** Realizar pruebas unitarias y refactorizar el código si es necesario.

**Tiempo estimado:** 3 horas

**Instrucciones:**

- Refactorizar la pieza de core de validación de solapamientos para mejorar su legibilidad y mantenibilidad
- Asegurar que las pruebas cubren todos los casos de aceptación definidos en la fase f2, incluyendo casos de error
- Verificar que las pruebas aíslan correctamente la pieza usando el seam definido

**Entregable:** Código refactorizado con pruebas unitarias que cubren al menos 4 casos de aceptación (2 de ellos de error o borde) para la lógica de negocio.

<details>
<summary>Pistas de conocimiento</summary>

- Considera usar un framework de pruebas para escribir las pruebas unitarias.
- Piensa en cómo mejorar la estructura del código para hacerlo más legible y mantenible.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué es una API REST y cuáles son sus componentes principales?
- **paraQueSirve**: ¿Para qué sirve validar solapamientos en las reservas de salas?
- **comoSeUsa**: ¿Cómo se usa la lógica de negocio para validar solapamientos en las reservas de salas?
- **erroresComunes**: ¿Cuáles son los errores comunes al implementar una API REST para reservas de salas?
- **queDecisionesImplica**: ¿Qué decisiones implica el diseño de una API REST para reservas de salas?

## Criterios de Evaluacion

- Definición correcta de endpoints y modelo de datos.
- Implementación correcta de la lógica de negocio para validar solapamientos.
- Manejo efectivo de errores.
- Pruebas unitarias que validan el funcionamiento de la lógica de negocio.
- Código refactorizado para mejorar su legibilidad y mantenibilidad.

## Mapa de fases

La **Fase 0** es clonar el repositorio, instalar dependencias y correr las pruebas de aceptacion: todas fallan porque la logica de cada pieza esta pendiente.

| Fase | Pieza (skill) | Archivo:simbolo | Criterios | Prueba | Comando |
|------|---------------|-----------------|-----------|--------|---------|
| f1 — Definición de endpoints y modelo de datos | Definición de modelos de datos con validaciones básicas | — | Los endpoints para CRUD de reservas están definidos con sus métodos HTTP y paths; El modelo de datos incluye campos obligatorios: fecha de inicio, fecha de fin, sala y usuario; Se definen casos de error para entradas inválidas (fechas mal formateadas, campos faltantes); Se define la estructura de respuesta para errores de validación | `src/acceptance/f1.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f1.test.ts` |
| f1 — Definición de endpoints y modelo de datos | Definición de endpoints REST | `src/domain/services/reservation.service.ts:reservationRoutes` | Los endpoints para CRUD de reservas están definidos con sus métodos HTTP y paths; El modelo de datos incluye campos obligatorios: fecha de inicio, fecha de fin, sala y usuario; Se definen casos de error para entradas inválidas (fechas mal formateadas, campos faltantes); Se define la estructura de respuesta para errores de validación | `src/acceptance/f1.test.ts` | `npx jest --preset ts-jest --runInBand --forceExit src/acceptance/f1.test.ts` |
| f2 — Implementación de la lógica de negocio | Validación de solapamientos de reservas | `src/domain/models/reservation.model.ts:ReservationService.validateOverlap` | La lógica de validación de solapamientos funciona correctamente para reservas en la misma sala; Se manejan casos borde como reservas que empiezan exactamente cuando termina otra; Se lanzan errores apropiados cuando hay solapamientos; La lógica está aislada en una pieza de core con responsabilidades exclusivas | — | — |
| f2 — Implementación de la lógica de negocio | Acceso a datos para validación de solapamientos | `src/infrastructure/error/error.mapper.ts:ReservationRepository.findByRoomAndTime` | La lógica de validación de solapamientos funciona correctamente para reservas en la misma sala; Se manejan casos borde como reservas que empiezan exactamente cuando termina otra; Se lanzan errores apropiados cuando hay solapamientos; La lógica está aislada en una pieza de core con responsabilidades exclusivas | — | — |
| f3 — Pruebas y refactorización | Refactorización de lógica de negocio con pruebas exhaustivas | — | El código está refactorizado y pasa todas las pruebas existentes; Se añaden pruebas para casos de error no cubiertos previamente; La cobertura de pruebas incluye al menos 4 casos de aceptación para la lógica de negocio | — | — |
| f3 — Pruebas y refactorización | Pruebas unitarias para lógica de negocio | — | El código está refactorizado y pasa todas las pruebas existentes; Se añaden pruebas para casos de error no cubiertos previamente; La cobertura de pruebas incluye al menos 4 casos de aceptación para la lógica de negocio | — | — |

## Pruebas de aceptacion

Las pruebas de aceptacion (columna "Prueba" de la tabla) son de **solo lectura**: definen que significa "listo". No las edites, no las borres y no les agregues `skip`; lo que se resuelve es el codigo de cada pieza.

## Restricciones del pedido

| Restriccion | Donde se cumple | Estado |
|-------------|-----------------|--------|
| El modelo de datos debe incluir campos para fecha de inicio, fecha de fin, sala y usuario | sin ubicar | Verificada |
| Los endpoints deben seguir el estándar REST para operaciones CRUD | sin ubicar | Restriccion no verificada en sin ubicar |

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install --no-audit --no-fund && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
