import { Injectable } from "@nestjs/common";

/**
 * Service to manage blacklisted JWT tokens.
 * In production, consider using Redis for distributed systems.
 */
@Injectable()
export class TokenBlacklistService {
  private blacklistedTokens: Set<string> = new Set();
  private tokenExpirationMap: Map<string, number> = new Map();
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.cleanupInterval = setInterval(() => {
      this.cleanupExpiredTokens();
    }, 60 * 60 * 1000);
  }

  /**
   * Decode JWT payload without verification (just for getting expiration)
   */
  private decodeTokenPayload(token: string): { exp?: number } | null {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) {
        return null;
      }
      const payload = Buffer.from(parts[1], 'base64').toString('utf-8');
      return JSON.parse(payload);
    } catch (error) {
      return null;
    }
  }

  /**
   * Add a token to the blacklist
   */
  async blacklistToken(token: string): Promise<void> {
    try {
      const decoded = this.decodeTokenPayload(token);

      if (decoded && decoded.exp) {
        const expirationTime = decoded.exp * 1000;
        this.blacklistedTokens.add(token);
        this.tokenExpirationMap.set(token, expirationTime);
      } else {
        this.blacklistedTokens.add(token);
      }
    } catch (error) {
      this.blacklistedTokens.add(token);
    }
  }

  /**
   * Check if a token is blacklisted
   */
  async isTokenBlacklisted(token: string): Promise<boolean> {
    if (!this.blacklistedTokens.has(token)) {
      return false;
    }

    const expirationTime = this.tokenExpirationMap.get(token);
    if (expirationTime && Date.now() > expirationTime) {
      this.blacklistedTokens.delete(token);
      this.tokenExpirationMap.delete(token);
      return false;
    }

    return true;
  }

  /**
   * Remove expired tokens from the blacklist
   */
  private cleanupExpiredTokens(): void {
    const now = Date.now();
    const tokensToRemove: string[] = [];

    for (const [token, expirationTime] of this.tokenExpirationMap.entries()) {
      if (now > expirationTime) {
        tokensToRemove.push(token);
      }
    }

    tokensToRemove.forEach((token) => {
      this.blacklistedTokens.delete(token);
      this.tokenExpirationMap.delete(token);
    });

    if (tokensToRemove.length > 0) {
      console.log(`Cleaned up ${tokensToRemove.length} expired blacklisted tokens`);
    }
  }

  /**
   * Cleanup on service destruction
   */
  onModuleDestroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }
  }
}
