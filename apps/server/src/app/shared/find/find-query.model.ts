import { ApiProperty }          from '@nestjs/swagger';
import { Transform }            from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { ObjectLiteral }        from 'typeorm/common/ObjectLiteral';
import { FindOptionsSelect, }   from 'typeorm/find-options/FindOptionsSelect';
import { FindOptionsWhere }     from 'typeorm/find-options/FindOptionsWhere';

export class SearchOptions<Entity extends ObjectLiteral = any> {
  /**
   * @example e.g. ?firstName=John
   */
  @IsOptional()
  @ApiProperty({
    required: false,
    oneOf: [{ type: 'array', items: { type: 'object' } }, { type: 'object' }],
  })
  where?: FindOptionsWhere<Entity> | FindOptionsWhere<Entity>[];

  @IsString()
  @IsOptional()
  @Transform(({ value }) => (isQueryParamArray(value) ? value[0].split(',') : value))
  @ApiProperty({ type: 'string' })
  select?: FindOptionsSelect<Entity>;
}

function isQueryParamArray(value) {
  return value.length === 1 && value[0].includes(',');
}

// example where condition
// ?$and[0][id][$nin][0]=3&$and[0][id][$nin][1]=4&$and[1][id][$gt]=2
// --> { $and: [{ id: { $nin: [3, 4] } }, { id: { $gt: 2 } }] }

// object/array to query parameter
// function serialize(obj, prefix) {
//   var str = [],
//     p;
//   for (p in obj) {
//     if (obj.hasOwnProperty(p)) {
//       var k = prefix ? prefix + "[" + p + "]" : p,
//         v = obj[p];
//       str.push((v !== null && typeof v === "object") ?
//         serialize(v, k) :
//         encodeURIComponent(k) + "=" + encodeURIComponent(v));
//     }
//   }
//   return decodeURIComponent(str.join("&"))
// }
