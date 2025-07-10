const PORT:number = Number(process.env.PORT) as number;
const DB_URL:string = process.env.DB_URL as string;
const JWT_SECRET:string = process.env.JWT_SECRET as string;

export const ENV = {
    PORT,
    DB_URL,
    JWT_SECRET
}