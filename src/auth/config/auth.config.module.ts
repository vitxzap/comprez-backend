import { Module } from '@nestjs/common';
import { AUTH_CONFIG } from './symbols';
import { AuthConfigService } from './auth.config.service';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [PrismaModule],
  exports: [AUTH_CONFIG],
  providers: [AuthConfigService]
})
export class AuthConfigModule {}
