import { HttpService } from '@nestjs/axios'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { firstValueFrom } from 'rxjs'

import { serviceConfig } from '@/config/gateway.config'

interface UserSession {
    valid: boolean
    user: {
        id: string
        email: string
        firstName: string
        lastName: string
        role: string
        status: string
    } | null
}

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly httpService: HttpService
    ) {}

    validateJwtToken(token: string): Promise<any> {
        try {
            return this.jwtService.verify(token)
        } catch (error) {
            throw new UnauthorizedException('Invalid JWT token')
        }
    }

    async validateSessionToken(sessionToken: string): Promise<UserSession> {
        try {
            const { data } = await firstValueFrom(
                this.httpService.get<UserSession>(`${serviceConfig.users.url}/sessions/validate/${sessionToken}`, {
                    timeout: serviceConfig.users.timeout,
                })
            )

            return data
        } catch (error) {
            throw new UnauthorizedException('Invalid session token')
        }
    }

    async signIn(signInDto: { email: string; password: string }) {
        try {
            const { data } = await firstValueFrom(
                this.httpService.post(`${serviceConfig.users.url}/sign-in`, signInDto, {
                    timeout: serviceConfig.users.timeout,
                })
            )
        } catch (error) {
            throw new UnauthorizedException('Invalid credentials token')
        }
    }

    async signOut(signOutDto: any) {
        try {
            const { data } = await firstValueFrom(
                this.httpService.post(`${serviceConfig.users.url}/auth/sign-out`, signOutDto, {
                    timeout: serviceConfig.users.timeout,
                })
            )
        } catch (error) {
            throw new UnauthorizedException('Registration failed')
        }
    }
}
