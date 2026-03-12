import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Throttle } from '@nestjs/throttler'

import { SignInDto } from '../dtos/sign-in.dto'
import { SignUpDto } from '../dtos/sign-up.dto'
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
    async signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto)
    }

    @Post('sign-up')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'User sign-up' })
    @ApiResponse({ status: 201, description: 'Sign-up successful' })
    @ApiResponse({ status: 400, description: 'Invalid registration data' })
    @Throttle({ medium: { limit: 3, ttl: 60000 } })
    async signOut(@Body() signUpDtp: SignUpDto) {
        return this.authService.signIn(signUpDtp)
    }
}
