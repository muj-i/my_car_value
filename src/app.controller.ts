import { Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHeath(): string {
    return this.appService.health();
  }

  @Post('two-fa/generate')
  async gen() {
    return this.appService.generateTwoFaSecret();
  }

  @Post('two-fa/validate')
  async ver(@Req() req: Request) {
    return this.appService.validateTwoFa(req.body.secretKey, req.body.totp);
  }
}
