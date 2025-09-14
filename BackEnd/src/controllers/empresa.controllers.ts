import ZodEmpresaSchema from "../schema/empresas.schema";
import IEmpresa from "../model/empresa.models";
import { Request, Response } from "express";

export const crearEmpresa = async (req: Request, res: Response) => {
  try {
    const validarDatos = ZodEmpresaSchema.safeParse(req.body);

    if (!validarDatos.success) {
      const errores = validarDatos.error.issues.map((err) => ({
        campo: err.path.join("."),
        ValorIngresado: req.body[err.path[0]],
        mensaje: err.message,
        codigo: err.code,
      }));
      console.error("Error en la validación de datos en Zod", errores);

      return res.status(400).json({
        message: "Error en la validación de datos",
        errores,
      });
    }

    const nuevaEmpresa = new IEmpresa(validarDatos.data);

    const guardarEmpresa = await nuevaEmpresa.save();

    res.status(201).json({
      message: "Empresa creada exitosamente ✅",
      empresa: guardarEmpresa,
    });
    console.log("Empresa de cliente creada 🤗");
  } catch (error) {
    console.error("Error al crear la empresa", error);
    res.status(500).json({ message: "Error interno del servidor 📟"})
  }
};