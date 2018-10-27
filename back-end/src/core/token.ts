import * as jwt from 'jsonwebtoken';
import cryptoRandoomString from 'crypto-random-string';
import { UserModel } from '../models/user/user.model';
import { TokenInfo } from './token-info';

function secret() {
  const tokenSecret = 'MIICWgIBAAKBgHZO6k7puB6v6zbIeHDbl0qDzZiRwLTkUTDRi3IYQeARSCJ3eh3P\n' +
    'k4Zp7WA2raVYJ7L4q6zaN813chDLahTDlNEqKvelxF67pgtd/jFcbSn4zTdwgAy2\n' +
    'XfOSWyf1oGf7Aco4qlKhVVGGMIviL7emGkeNZ7mR3uRNSbAsElWkST+1AgMBAAEC\n' +
    'gYA6tYqcwmq1/8KPmwf5qV74gVOjZKDmo26O9U1nvxXhpXHQeM3GwV2KFELRvhCJ\n' +
    'vqdkrvYyfs+2TJH0N51a1HuiaqJ9/6vqAxMcvrqEhBFqPzEO2V0Keaf/C3rDQx/r\n' +
    'X9lAN9Sqb8qe//jJO7sHEwJ2aERVK19KygW0lJNFi33fwQJBAMLEw2AtGdXkyGbs\n' +
    'Og9Vs12ZvThqzYQond5u5jrVt5WhR+SgdmRdZklg16KGQWQvCS14NeCfBfZIAsZe\n' +
    '56AzPwkCQQCbgIWViRZGLFESgCiWpPXqqZUe8SYkql03aVinEm1E1LWEQME0GMDB\n' +
    '/BMc8jh7HhlHLnXLIK4Tny7mBlkibXpNAkBanCFsp+7CBHp672EfazZT0EcobP+J\n' +
    'gT/YkG1JZ83Nrcd9hG0vygfhEU2gTac0TXGOlsMx6aljZyLrWJGXhN/JAkAaXahI\n' +
    'un20WD9Gy8QWBtJLf4VxQaIeBWTYyFvnuBAe45IDYpdfpfLI8VysQ8Wf2nKexxnh\n' +
    '3yCk4xCon9rtI3LhAkBxJfvU/VY4Q0KUUwGzal36V2h11cTWGnTo4Qk/WwuzkTnz\n' +
    'yv6UJ03jxddg7QLMDFI+97gLIMi2caCcH1cxUpsm';

  return () => tokenSecret;
}

export class Token {
  private static expiredIn = '12h';
  private static saltLength = 15;

  public static createToken(login: string): string {
    return jwt.sign(
      {
        name: login,
        timestamp: new Date(),
        salt: cryptoRandoomString(Token.saltLength)
      },
      secret()(),
      {expiresIn: Token.expiredIn}
    );
  }

  public static isValid(token: string): Promise<TokenInfo> {
    return new Promise((resolve, err) => {
      UserModel.findOne({token}, (err, user: UserModel) => {
        // return to stop executing function
        if (err) {
          err(err);
          return;
        }

        if (!user) {
          resolve({
            isValid: false,
            user: null
          });
        } else {
          Token.isExpired(token)
            .then((expired: boolean) => {
              resolve({
                isValid: !expired,
                user
              });
            })
        }
      });
    });
  }

  private static isExpired(token: string): Promise<boolean> {
    return new Promise((resolve) => jwt.verify(token, secret()(), (err) => {
      if (err) {
        console.log('Token expired or invalid');
      }

      resolve(!!err)
    }));
  }
}
