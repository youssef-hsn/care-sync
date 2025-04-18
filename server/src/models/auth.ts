import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  TokenPayload
} from '@/utils/auth';

class AuthModel {
  static refreshAccessToken(refreshToken: string): string {
    const { userId, roles } = verifyRefreshToken(refreshToken);
  
    return generateAccessToken({ userId, roles });
  }

  static generateTokenPair(payload: TokenPayload): { accessToken: string; refreshToken: string } {
    return {
      accessToken: generateAccessToken(payload),
      refreshToken: generateRefreshToken(payload)
    };
  }
}

export default AuthModel;