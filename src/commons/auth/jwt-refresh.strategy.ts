import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { Cache } from 'cache-manager';

// 해당 로직을 통과 하여야만 Guard를 통과 할 수 있음.
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        const refreshToken = cookie.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: process.env.REFRESH_TOKEN_SECRET,
      passReqToCallback: true,
    });
  }
  async validate(req, payload) {
    const refreshToken = 'refreshToken:' + req.headers.cookie.split('=')[1];
    const redisRefreshToken = await this.cacheManager.get(refreshToken);
    if (redisRefreshToken) {
      throw new UnauthorizedException('만료된 리프레시 토큰입니다.');
    }
    return {
      email: payload.email,
      id: payload.sub,
    };
  }
}
