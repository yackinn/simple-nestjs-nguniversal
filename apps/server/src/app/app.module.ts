import { Module }                 from '@nestjs/common';
import { TypeOrmModule }          from '@nestjs/typeorm';
import { AngularUniversalModule } from '@nxarch/nest-nguniversal';
import { join }                   from 'path';
import { ormConfig }              from '../config/orm.config';
import { ApiModule }              from './api/api.module';
import { RenderModule }           from './render/render.module';

@Module({
  imports: [
    ApiModule,
    AngularUniversalModule.forRoot({
      bootstrap: join(process.cwd(), 'dist/apps/ui/ssr/main.js'),
      viewsPath: join(process.cwd(), 'dist/apps/ui/browser'),
      useCustomRenderEndpoint: true
    }),
    TypeOrmModule.forRoot(ormConfig),
    RenderModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
