import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js'
import { signupSchema,loginSchema } from '../validators/authValidator.js';


export const userRegister=async (req, res) => {
    try {
        const {error}=signupSchema.validate(req.body);
        if(error){
            return res.status(400).json({message:error.details[0].message})
        }

        const { username, email, password } = req.body;

        const existingUser = await pool.query(
            `SELECT * FROM users WHERE username= $1 OR email= $2`,
            [username, email]
        );
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "username or email is already exist " })
        }

        let hashPassword = await bcrypt.hash(password, 10)

        const result = await pool.query(
            `INSERT INTO users(username,email,password)
             VALUES($1,$2,$3)
             RETURNING id,username,email,role`,
            [username, email, hashPassword]
        );
        res.status(200).json({
            message: "USer registered successfully !!!",
            user: result.rows[0]
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server Error........!!!!!" })
    }
}

export const userLogin=async (req, res) => {
    try {
        const {error}=loginSchema.validate(req.body)
        if(error){
            return res.status(400).json({message:error.details[0].message})
        }
        const { email, password } = req.body;

        const data = await pool.query(`SELECT * FROM users WHERE email=$1`, [email])

        if(data.rows.length<=0){
            return res.status(400).json({message:"Email does not exist..!!!!"});
        }

        const user=data.rows[0]

        const hashPassword=user.password;

        let isMatch=await bcrypt.compare(password,hashPassword)

        if(!isMatch){
            return res.status(400).json({message:"Passsword does not match...!!!!!!!"});
        }
        const token=jwt.sign(
            {userId:user.id,email:user.email,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:'12h'}
        )
         
         res.status(200).json({message:"User login succcessfully....!!!!",token})
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error..!!!",})
    }
}