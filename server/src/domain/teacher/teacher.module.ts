import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeacherController } from './teacher.controller';
import { TeacherRepository } from './teacher.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TeacherRepository])],
  providers: [],
  controllers: [TeacherController],
})
export class TeacherModule {}
