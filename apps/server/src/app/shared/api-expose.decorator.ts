import { applyDecorators }              from '@nestjs/common';
import { ApiProperty }                  from '@nestjs/swagger';
import { ApiPropertyOptions }           from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Expose, ExposeOptions, Type }  from 'class-transformer';
import { TypeHelpOptions, TypeOptions } from 'class-transformer/types/interfaces';
import { IsOptional }                   from 'class-validator';
import { isFunction, objectSpread }     from './object.util';

interface CustomOptions {
  optional?: boolean;
}

type Options = ApiPropertyOptions & ExposeOptions & TypeOptions & CustomOptions;
type TypeFn = (type?: TypeHelpOptions) => any;

export function ApiExpose(type?: TypeFn);
export function ApiExpose(config?: Options);
export function ApiExpose(type?: TypeFn, config?: Options);
export function ApiExpose(configOrType?: TypeFn | Options, config?: Options) {
  let typeFn: TypeFn | undefined;
  let _options: Options | undefined = config;
  if (isFunction<TypeFn>(configOrType)) {
    typeFn = configOrType;
  }
  else {
    _options = configOrType;
  }

  const decorators: PropertyDecorator[] = [Expose(_options)];

  if (typeFn) {
    decorators.push(ApiProperty({ ...objectSpread(_options), type: () => typeFn!() }));
    decorators.push(Type(typeFn, _options));
  }
  else {
    decorators.push(ApiProperty(_options));
  }

  if (_options?.optional) decorators.push(IsOptional());

  return applyDecorators(...decorators);
}
