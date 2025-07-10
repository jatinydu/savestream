import jwt from 'jsonwebtoken';
import { ENV } from '../config';

export const generateAuthToken=(data:any)=>{
    const token = jwt.sign({}, ENV.JWT_SECRET as string, {
        expiresIn: '1d'
    });
    return token;
}