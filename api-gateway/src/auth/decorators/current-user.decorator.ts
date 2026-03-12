import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { Request } from 'express'

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
    const { user } = context.switchToHttp().getRequest<Request>()

    return user
})
