import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { Observable } from 'rxjs'

const JwtGuard = AuthGuard('jwt')

interface JwtUser {
    userId: string
    email: string
    role: string
}

@Injectable()
export class JwtAuthGuard extends JwtGuard {
    constructor(private reflector: Reflector) {
        super()
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ])

        if (isPublic) return true

        return super.canActivate(context)
    }

    handleRequest<TUser = JwtUser>(
        error: Error | null,
        user: JwtUser | false,
        info: never,
        context: ExecutionContext,
        status?: unknown
    ): TUser {
        if (error || !user) {
            throw error || new UnauthorizedException()
        }

        return user as TUser
    }
}
