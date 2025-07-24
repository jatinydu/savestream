import jwt from 'jsonwebtoken';
import { ENV } from '../config';

export const generateAuthToken=(data:any)=>{
    const token = jwt.sign(data, ENV.JWT_SECRET as string, {
        expiresIn: '1d'
    });
    return token;
}