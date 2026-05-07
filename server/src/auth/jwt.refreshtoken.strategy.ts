import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Req, Res, UnauthorizedException } from '@nestjs/common';
import { Request as RequestType } from 'express'

import { jwtConstants } from './constants';
import { UsersService } from 'src/users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refesh-token') {
    constructor(private usersService: UsersService, private configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                JwtRefreshTokenStrategy.extractJWT,
                ExtractJwt.fromAuthHeaderAsBearerToken()
            ]),
            ignoreExpiration: false,
            secretOrKey: `${configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET')}`,
        });
    }

    private static extractJWT( @Req() req ): string | null {
        if(req.cookies && req.cookies?.jwt) {
            return req.cookies?.jwt
        } else {
            throw new UnauthorizedException()
        }
    }

    async validate(payload: any) {
        const user = await this.usersService.findByUsername(payload.username)
        if(!user || user.refreshToken === null) {
            throw new UnauthorizedException()
        }
        // const refreshTokenVerified = this.usersService.getUserIfRefreshTokenMatches(payload.username)
        return { userId: user.id, username: user.username };
    }
}
