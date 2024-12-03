import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async generateTwoFaSecret(): Promise<string> {
    const secret = speakeasy.generateSecret({ length: 20 }).base32;
    console.log('secret: ', secret);
    return secret;
  }

  async validateTwoFa(sec: string, token: string): Promise<any> {
    const isValidToken = speakeasy.totp.verify({
      secret: sec,
      encoding: 'base32',
      token: token,
      window: 1,
    });
    console.log('isValidToken: ', isValidToken);
    return isValidToken;
  }
}
