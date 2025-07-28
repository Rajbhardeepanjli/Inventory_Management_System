import pool from '../config/db.js';
import { supplierSchema } from '../validators/supplierValidator.js';

export const createSuppliers=async (req, res) => {
  try {
    if (req.user.role != 'admin') {
      return res.status(403).json({ message: "Unauthorised access..!!!" })
    }
    const { error } = supplierSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }
    const { name, email, contact, upi } = req.body;

    let supplierData = await pool.query
      (`INSERT INTO suppliers(name,email,contact,upi)
  VALUES($1,$2,$3,$4)
  RETURNING name,email,contact,upi`,
        [name, email, contact, upi]
      )

    res.status(200).json({ message: "Suppliers data Added", data: supplierData.rows[0] })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error...!!!" })
  }
}

export const getAllSuppliers=async (req, res) => {
  try {
    let supplierData = await pool.query(`SELECT * FROM suppliers`);
    if (supplierData.rowCount === 0) {
      return res.status(404).json({ message: 'No suppliers data yet...!!!' });
    }
    let data = supplierData.rows;
    res.status(200).json({ message: 'All suppliers Data', data })
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error...!!!" })
  }
}

export const getSuppplierById=async (req, res) => {
  try {
    let id = req.params.id;

    let supplierData = await pool.query(`SELECT * FROM suppliers WHERE id=$1`, [id]);
    if (supplierData.rowCount === 0) {
      return res.status(404).json({ message: "Suppliers data not exist ...!!!" })
    }
    let data = supplierData.rows;
    res.status(200).json({ message: 'Suppliers data found...!!!', data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error..!!!" })
  }
}

export const updateSupplier=async (req, res) => {
  try {
    if (req.user.role != 'admin') {
     return res.status(401).json({ message: 'Unauthorised Access...!!!' })
    }

    let id = req.params.id;
    let supplierData = await pool.query(`SELECT * FROM suppliers WHERE id=$1`, [id]);
    if (supplierData.rowCount === 0) {
      return res.status(404).json({ message: ' suppplier data does not exist...!!!' })
    }

    let { error } = supplierSchema.validate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    let { name, email, contact, upi } = req.body;
    let updateSupplier = await pool.query(
      `UPDATE suppliers 
      SET name=$1,email=$2,contact=$3,upi=$4 WHERE id=$5
      RETURNING name,email,contact,upi`,
      [name, email, contact, upi,id]
    )


    res.status(200).json({ message: "Supplier updated successfully...!!!", data:updateSupplier.rows[0] })


  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Internal server error...!!!' })
  }
}

export const deleteSupplier=async(req,res)=>{
  try{
    if(req.user.role!='admin'){
      return res.status(401).json({message:"Unauthorized access...!!!"})
    }
    let id=req.params.id;
    let existingSupplier=await pool.query(`SELECT * FROM suppliers WHERE id=$1`,[id])
    if(existingSupplier.rowCount===0){
      return res.status(404).json({message:"No supplier data exist...!!!"})
    }

    let deleteSupplier=await pool.query(`DELETE FROM suppliers WHERE id=$1 RETURNING name ,email,contact`,[id]);

    res.status(200).json({message:"Supplier data deleted successfully...!!!",data:deleteSupplier.rows[0]})

  }catch(err){
    console.error(err)
    res.status(500).json({message:'Internal server error...!!!'})
  }
}