import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';

@Injectable()
export class AppService {
  health(): string {
    return 'Hello world! I am good.';
  }

  async generateTwoFaSecret(): Promise<any> {
    const secret = speakeasy.generateSecret({ length: 20 }).base32;
    console.log('secret: ', secret);
    return { secretKey: secret };
  }

  async validateTwoFa(secretKey: string, totp: string): Promise<any> {
    const isValidToken = speakeasy.totp.verify({
      secret: secretKey,
      encoding: 'base32',
      token: totp,
      window: 1,
      time: 30,
    });
    console.log('isValidToken: ', isValidToken);
    return { isValidate: isValidToken };
  }
}
