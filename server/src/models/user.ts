import { db } from "@/db";
import { users, userRoles, roles } from "@/db/schema";
import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { eq, like } from "drizzle-orm";
import { hashPassword, comparePassword } from "@/utils/auth";

export type User = InferSelectModel<typeof users>;
export type NewUser = InferInsertModel<typeof users>;
export type UserRole = InferSelectModel<typeof userRoles>;
export type SystemRole = typeof roles.enumValues[number];

export class UserAlreadyExistsError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "UserAlreadyExistsError";

    }
}

export class UserModel {
    static async create(data: Omit<NewUser, "passwordHash"> & { password: string }): Promise<User> {
        const { password, ...rest } = data;
        const passwordHash = await hashPassword(password);
        
        const phoneUser = await this.findByPhone(rest.phone!)
        if (phoneUser && phoneUser.passwordHash) {
            throw new UserAlreadyExistsError("User with this phone number already exists");
        }

        const [user] = await db.insert(users)
            .values({ ...rest, passwordHash })
            .returning();
        
        return user;
    }

    static async findById(userID: number): Promise<User | null> {
        const [user] = await db.select()
            .from(users)
            .where(eq(users.userID, userID))
            .limit(1);
        
        return user || null;
    }

    static async findByPhone(phone: string): Promise<User | null> {
        const [user] = await db.select()
            .from(users)
            .where(like(users.phone, phone))
            .limit(1);
        
        return user || null;
    }

    static async getUserRoles(userID: number): Promise<Set<string>> {
        const roles = await db.select({ role: userRoles.role })
            .from(userRoles)
            .where(eq(userRoles.userID, userID));
        
        return new Set(roles.map(r => r.role));
    }

    static async verifyPassword(user: User, password: string): Promise<boolean> {
        if (!user.passwordHash) return false;
        return comparePassword(password, user.passwordHash);
    }

    static async updateUser(userID: number, data: Partial<NewUser>): Promise<User> {
        const [updated] = await db.update(users)
            .set(data)
            .where(eq(users.userID, userID))
            .returning();
        
        return updated;
    }

    static async addRole(userID: number, role: SystemRole): Promise<void> {
        await db.insert(userRoles)
            .values({ userID, role })
            .onConflictDoNothing();
    }
}
