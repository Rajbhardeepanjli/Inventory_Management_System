//-----------------------Expres-Setup-----------------------------
import express from 'express';
const app=express();
const PORT=process.env.PORT||5000;
//-----------------------Env-Setup--------------------------------
import dotenv from 'dotenv';
dotenv.config();

//----------------------Data parcing-----------------------------
import cors from 'cors';
//----------------------Data parcing-----------------------------
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//----------------------Database-Connection-------------------------
import pool from './config/db.js'

(async()=>{
    try{
     const res=await pool.query('SELECT NOW()')
     console.log('Database connected at', res.rows[0].now)
    }catch(err){
    console.error("Database connection failed",err)
    }
})();
//---------------------------Middleware-------------------------------
app.use(cors());
//----------------------------Api--------------------------------------

import authRoutes from './routes/authRoutes.js'
app.use('/api/auth',authRoutes);
app.listen(PORT,(req,res)=>{
    console.log(`app is listening on port ${PORT}`)
})