import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';
import * as dotenv from 'dotenv';
import { parse } from 'pg-connection-string';

dotenv.config(); // Load environment variables

const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  throw new Error('DATABASE_URL environment variable is not set');
}
const dbConfig = parse(dbUrl);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: dbConfig.host ?? undefined,
      port: dbConfig.port ? parseInt(dbConfig.port) : 5432,
      username: dbConfig.user,
      password: dbConfig.password,
      database: dbConfig.database ?? 'test',
      ssl: { rejectUnauthorized: false }, // Required for Render
      entities: [__dirname + '/../**/*.entity.js'], // <-- Only .js!
      synchronize: true, // Set to false in production for safety
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
