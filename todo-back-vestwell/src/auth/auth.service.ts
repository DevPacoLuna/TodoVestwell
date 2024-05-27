import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findByEmail(email);

    const samePassword = await verify(user?.password, pass);
    if (!samePassword) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };

    return { accessToken: await this.jwtService.signAsync(payload) };
  }
}
