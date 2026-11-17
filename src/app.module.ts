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