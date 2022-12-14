import { Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

export function toResponse<T>(type: Type<T>, data: ObjectLiteral | ObjectLiteral[]): T {
  return plainToClass(type, data, { excludeExtraneousValues: true, strategy: 'exposeAll' });
}
