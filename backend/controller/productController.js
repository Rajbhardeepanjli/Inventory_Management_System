import { productSchema } from '../validators/productValidator.js';
import pool from '../config/db.js'


export const createProduct=async(req, res) => {
    try {
        let user = req.user;
        if (user.role != 'admin') {
            return res.status(400).json({ message: "Unathorized acess..!!!" })
        }

        const { error } = productSchema.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        let { name, description, price, quantity } = req.body

        let productData = await pool.query(
            `INSERT INTO products (name,description,price,quantity)
            VALUES ($1,$2,$3,$4)
            RETURNING name,description,price,quantity`,
            [name, description, price, quantity]
        )
        res.status(200).json({ message: "Product added successfully..!!!!", product: productData.rows[0] })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error..!!!!" })
    }
}

export const getAllProduct=async (req, res) => {
    try {
        const productData = await pool.query('SELECT * FROM products')
        if (productData.rowCount <= 0) {
            return res.status(404).json({ message: "No productrsa added yet..!!!" })
        }

        let data = productData.rows
        res.status(200).json({ message: "All Products....!!!", data })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "internal server error..!!!!" })
    }
}

export const getSingleProduct=async (req, res) => {
    try {
        const id = req.params.id;
        const data = await pool.query(`SELECT * FROM products WHERE id=$1`, [id]);
        if (data.rowCount === 0) {
            return res.status(400).json({ message: "Product does not exist...!!!" })
        }
        res.status(200).json({ message: "Product fetched successfully", product: data.rows[0] })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error..!!!!" })
    }
}

export const deleteProduct= async (req, res) => {
    const id = req.params.id;
    try {
        if (req.user.role != 'admin') {
            return res.status(404).json({ message: "Unauthorized Access..!!!" })
        }

        const data = await pool.query(`DELETE  FROM products WHERE id=$1 RETURNING name,description,price,quantity`, [id])

        if (data.rowCount === 0) {
            return res.status(404).json({ message: "Product not found..!!!" });
        }
        res.status(200).json({ message: 'Product Deleted...!!!', product: data.rows[0] })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error..!!!!" })
    }
}


export const updateProduct=async(req,res)=>{
    const id=req.params.id;
    try{
     if(req.user.role!='admin'){
        return res.status(404).json({message:"Unauthorized access..!!!"})
     }

     let productData=await pool.query(`SELECT * FROM products WHERE id=$1`,[id]);

     if(productData.rowCount===0){
        return res.status(404).json({message:"Product does not exist...!!!"})
     }

     const {error}=productSchema.validate(req.body)
     if(error){
        return res.status(400).json({message:error.details[0].message})
     }
    const { name, description, price, quantity } = req.body;

    let updateProduct=await pool.query(
    `UPDATE products
    SET name=$1,description=$2,price=$3,quantity=$4
    WHERE id=$5
    RETURNING name,description,price,quantity`,
    [name,description,price,quantity,id]
     )

    res.status(200).json({message:"Product updated successfuly...!!!",product: updateProduct.rows[0]})
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Internal server error...!!!"})
    }
}