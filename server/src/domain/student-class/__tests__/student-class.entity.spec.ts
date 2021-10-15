import { BadRequestException } from '../../../exceptions/bad-request.exception';
import { Course } from '../../../domain/course/course.entity';
import { StudentClass } from '../student-class.entity';

it('new_class_with_inative_course_is_invalid', () => {
  const course = Course.create('Course One', false);

  try {
    StudentClass.create(course, 'Class One', true);
    fail('student should not be instantiated');
  } catch (ex) {
    expect(ex).toBeInstanceOf(BadRequestException);
  }
});
