import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Load environment variables from .env file

  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Order Processing REST apis')
    .setDescription('apis')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
