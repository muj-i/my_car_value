import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('2fa/generate')
  async gen() {
    return this.appService.generateTwoFaSecret();
  }

  @Post('2fa/validate')
  async ver(@Req() req: Request) {
    return this.appService.validateTwoFa(req.body.sec, req.body.token);
  }
}
