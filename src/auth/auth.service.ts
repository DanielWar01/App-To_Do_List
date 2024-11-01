/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

const EXPIRE_TIME = 3600 * 1000;
@Injectable()
export class AuthService {

    constructor(private userService: UserService,
        private jwtService: JwtService
    ){}

    async login(dto:LoginDto){
        const user = await this.validateUser(dto);
        const payload = {
            username: user.email,
            sub: {
                username: user.username,
            }
        }
        return {
            user,
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '1h',
                    secret: process.env.jwtSecretKey
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.jwtRefreshToken
                })
            }
        }
    }

    async validateUser(dto: LoginDto){
        const user = await this.userService.findByEmail(dto.username);
        if(user && (await compare(dto.password, user.password))){
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const {password, ...result} = user;
            return result;
        }
        throw new UnauthorizedException();
    }

    async refreshToken(user: any) {
        const payload = {
            username: user.username,
            sub: user.sub,
        };
    
        return {
            accessToken: await this.jwtService.signAsync(payload, {
            expiresIn: '1h',
            secret: process.env.jwtSecretKey,
            }),
            refreshToken: await this.jwtService.signAsync(payload, {
            expiresIn: '7d',
            secret: process.env.jwtRefreshToken,
            }),
            expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
        };
    }
}
