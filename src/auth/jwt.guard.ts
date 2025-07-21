import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context, status) {
    // console.log('🛡️ [JWT GUARD] handleRequest');
    if (err || !user) {
      console.log('❌ [JWT GUARD] Erro ou usuário ausente:', err, info);
      throw err || new Error('Não autorizado');
    }
    return user;
  }
}
