import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { config } from 'dotenv';

async function bootstrap() {
  config({ path: join(__dirname, '..', '.env') });
  console.log('MONGO_URL:', process.env.MONGODB_URI);
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
