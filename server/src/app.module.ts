import { Module } from '@nestjs/common';
import { APP_FILTER, APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection, getConnectionOptions } from 'typeorm';
import { Course } from './domain/course/course.entity';
import { CourseModule } from './domain/course/course.module';
import { CustomExceptionFilter } from './filters/custom-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';
import { StudentClass } from './domain/student-class/student-class.entity';
import { StudentClassModule } from './domain/student-class/student-class.module';
import { Student } from './domain/student/student.entity';
import { StudentModule } from './domain/student/student.module';

@Module({
  imports: [
    CourseModule,
    StudentClassModule,
    StudentModule,
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          entities: [Course, Student, StudentClass],
        }),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
  ],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
