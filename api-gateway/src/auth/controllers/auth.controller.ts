import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'

import { AuthService } from '../services/auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'User sign-in' })
    @ApiResponse({ status: 200, description: 'Sign-in successful' })
    @ApiResponse({ status: 401, description: 'Invalid credentials' })
    @Throttle({ short: { limit: 5, ttl: 60000 } })
    async signIn(@Body() signInDto: { email: string; password: string }) {
        return this.authService.signIn(signInDto)
    }

    @Post('sign-out')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'User sign-out' })
    @ApiResponse({ status: 201, description: 'Sign-out successful' })
    @ApiResponse({ status: 400, description: 'Invalid registration data' })
    @Throttle({ medium: { limit: 3, ttl: 60000 } })
    async signOut(@Body() signOutDto: any) {
        return this.authService.signIn(signOutDto)
    }
}
