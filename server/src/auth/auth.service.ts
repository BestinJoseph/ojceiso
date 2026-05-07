import { Injectable, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'

import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if(user) {
            const authenticated = await bcrypt.compare(pass, user.password)
            if (user && authenticated) {
                const { password, refreshToken, ...result } = user;
                return result;
            }
        }
        return null;
    }

    async login(user: any) {
        try {
            const payload = { username: user.username, sub: user.id, roles: user.roles, department: user.department };
            const accessToken = this.jwtService.sign(payload, { secret: `${this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET')}`, expiresIn: '15m'})
            const refreshToken = this.jwtService.sign(payload, { secret: `${this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET')}`, expiresIn: '7d'})
            const reRefreshToken = await this.usersService.updateRefreshToken(user.username, { refreshToken })
            return { user, access_token: accessToken, refreshToken };
        } catch (err) {
            return { error: err.message }
        }
    }

    async logout(user: any) {
        try {
            const authUser = await this.usersService.findByUsername(user.username)
            if(!authUser) {
                throw new UnauthorizedException()
            }
            await this.usersService.updateRefreshToken(user.username, { refreshToken: null })
            return { access_token: null }
        } catch (err) {
            return err?.message
        }
    }

    async refresh(refreshUser: any) {
        const user = await this.usersService.findByUsername(refreshUser.username)
        const payload = { username: user.username, sub: user.id, roles: user.roles };
        const accessToken = this.jwtService.sign(payload, { secret: `${this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET')}`, expiresIn: '15m'})
        return { access_token: accessToken, user};
    }
}
