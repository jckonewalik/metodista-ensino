import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  if (!process.env.DBHOSTNAME) {
    throw new Error('DBHOSTNAME must be defined');
  }
  if (!process.env.DBPORT) {
    throw new Error('DBPORT must be defined');
  }
  if (!process.env.DBUSER) {
    throw new Error('DBUSER must be defined');
  }
  if (!process.env.DBPASSWORD) {
    throw new Error('DBPASSWORD must be defined');
  }
  if (!process.env.DBNAME) {
    throw new Error('DBNAME must be defined');
  }

  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(3000);
}
bootstrap();
