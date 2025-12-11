import { User } from "../users/user.entity";

//TODO: Maybe rely on a library instead
export function clean<T extends object, K extends keyof T>(
    obj: T,
    keys: K[]
): Omit<T, K> {
    const clone = { ...obj } as any;

    for (const key of keys) {
        if (key in clone) {
            delete clone[key];
        }
    }

    return clone;
}

export const cleanedUser = (user: User | null) => !user ? null : clean(user, ['password'])
