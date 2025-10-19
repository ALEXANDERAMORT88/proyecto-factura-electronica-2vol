import IEmpresa from "../model/empresa.models";
import { Request, Response } from "express";


export const loginEmpresa = async ( req: Request, res: Response) => {
  const { email, passwordIngreso } = req.body;
  
  try {
    // Buscamos la empresa por el correo
    const empresa = await IEmpresa.findOne({ email });

    if (!empresa) {
      console.log("❌ Empresa no encontrada");
      return res.status(400).json({
        success: false,
        message: "Correo no registrado ❌"
      });
    }

    if (empresa.passwordIngreso !== passwordIngreso) {
      console.log("❌ Contraseña incorrecta para:", email);
      return res.status(401).json({
        success: false,
        message: "Contrase incorrecta ❌"
      });
    }
    
    console.log("✅ Login exitoso:", empresa.nombre);
    res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso ✅",
      empresa
    });
  } catch (error) {
    console.error("Error en login de empresa ❌", error);
    res.status(500).json({
      success:false,
      message:"Error en el servidor"
    });
  }
};