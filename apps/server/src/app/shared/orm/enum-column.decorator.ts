import { applyDecorators } from '@nestjs/common';
import { Column } from 'typeorm';
import { ColumnCommonOptions } from 'typeorm/decorator/options/ColumnCommonOptions';
import { ColumnEnumOptions } from 'typeorm/decorator/options/ColumnEnumOptions';

type EnumColumnDecoratorOptions = ColumnCommonOptions & ColumnEnumOptions;

export function EnumColumn(
  type: Record<any, any>,
  options?: Omit<EnumColumnDecoratorOptions, 'type' | 'enum'>
) {
  return applyDecorators(Column({ ...options, type: 'enum', enum: type }));
}
