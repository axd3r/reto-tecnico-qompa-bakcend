import { HttpModule } from '@nestjs/axios';
import { SunatService } from 'src/modules/sunat/sunat.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [HttpModule],
  providers: [SunatService],
  exports: [SunatService],
})
export class InfrastructureModule {}