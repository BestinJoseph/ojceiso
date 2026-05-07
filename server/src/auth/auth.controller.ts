import { Body, Controller, Get, Post, Request, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtRefreshTokenAuthGuard } from './jwt-refresh-token-auth.guard';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedController } from 'src/modules/unauthorized/unauthorized.controller';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private jwtServices: JwtService, private configService: ConfigService){}

    @UseGuards(LocalAuthGuard) 
    @Post('login')
    async login(@Request() req, @Res() res: Response) {
        const data =  await this.authService.login(req.user);
        res.cookie('jwt', data.refreshToken, { httpOnly: true, secure: true, sameSite: "none", maxAge: 7 * 24 * 60 * 60 * 1000 })
        return res.json({ user: data.user, access_token: data.access_token })
    }
    
    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Request() req, @Res() res) {
        if(!req.cookies?.jwt) throw new UnauthorizedException()
        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'none', })
        const { access_token } = await this.authService.logout(req.user);
        if(access_token !== null) {
            return { cool: 'welcome'}
        }
        res.json({ access_token })
    }

    @UseGuards(JwtRefreshTokenAuthGuard)
    @Get('refresh')
    async refresh(@Request() req) {
        const cookies = req.cookies
        // return cookies
        if(!cookies?.jwt) throw new UnauthorizedException()
        const verfiedRefreshToken = await this.jwtServices.verifyAsync( cookies.jwt, { secret: `${this.configService.getOrThrow('JWT_REFRESH_TOKEN_SECRET')}` })
        if(!verfiedRefreshToken) throw new UnauthorizedException()
        return this.authService.refresh(req.user)
    }
}
