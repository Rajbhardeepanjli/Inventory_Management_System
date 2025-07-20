//--------------------------------express----------------------------------------
import express from 'express';
const app=express();
const PORT=process.env.PORT ||5000

//--------------------------------Env setup--------------------------------------
import dotenv from 'dotenv';
dotenv.config();

//--------------------------------Data parsing-------------------------------------
import cors from 'cors';
//--------------------------------data parsing------------------------------------
app.use(express.json());
app.use(express.urlencoded({extended:true}))
//-----------------------------Database connection--------------------------------
import pool from './config/db.js'

(async()=>{
    try{
        const res=await pool.query('SELECT NOW()');
        console.log('Database connected successfully at :',res.rows[0].now);
    }catch(err){
        console.log('Database connection failed...!!!!',err)
    }
})();

//--------------------------Middlewares------------------------------------------
app.use(cors());
//-----------------------------Api------------------------------------------------
import authRoutes from './routes/authRoutes.js'
app.use("/api/auth", authRoutes);



app.listen(PORT,(req,res)=>{
    console.log(`app is listenig on port ${PORT}`)
})
