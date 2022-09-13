import { Controller, Get, Logger, Next, Req, Res, UseInterceptors } from '@nestjs/common';
import { NextFunction, Request, Response }                          from 'express';
import { VIEWS_PATH }                                               from '../constants';
import {
  InitSessionInterceptor
}                                                                   from '../shared/interceptors/init-session.interceptor';

@Controller()
export class RenderController {
  private logger = new Logger(RenderController.name);

  @UseInterceptors(InitSessionInterceptor)
  @Get('*')
  render(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    this.logger.log('Get Angular Server Side rendered html');
    res.render(VIEWS_PATH + '/index.html', { req, res });
  }
}
