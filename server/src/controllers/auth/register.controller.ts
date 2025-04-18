import { Request, RequestHandler, Response } from 'express';
import { UserModel, UserAlreadyExistsError } from '@/models/user';
import { registerSchema } from 'caresync/validations/auth.schema';

export const register: RequestHandler = async (req: Request, res: Response) => {
    const userInfo = registerSchema.safeParse(req.body);
    
    if (!userInfo.success) {
        res.status(400).json({ error: "Invalid input", details: userInfo.error.flatten() });
        return;
    }
    const { phone: userPhone, password, fullName } = userInfo.data;

    const [firstName, lastName] = fullName.split(' ');
    const phone = String(userPhone)
    try {
        const user = await UserModel.create({ phone, password, firstName, lastName });
        const safeUserData = {
            id: user.userID,
            phone,
            firstName,
            lastName
        }
        res.status(201).json({ message: 'User registered successfully', safeUserData });
        return;
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            res.status(409).json({ error: 'User with this phone number already exists' });
            return;
        }
        res.status(500).json({ error: 'Error registering user' });
        return;
    }
}
