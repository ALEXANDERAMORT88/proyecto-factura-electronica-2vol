import mongoose, {Schema, Document} from "mongoose";
import { string } from "zod";
// import { required } from "zod/v4/core/util.cjs";

export interface IEmpresa extends Document {
    tipoDocumento: string;
    nombre: string;
    celular: string;
    numeroDocumento: string;
    email: string;
    passwordIngreso: string
}

const EmpresaSchema: Schema = new Schema ({
    tipoDocumento: {type: string, required: true},
    nombre: {type: string, required: true},
    celular: {type: string, required: true},
    numeroDocumento:{type: string, required: true},
    email: {type: string, required:true},
    passwordIngreso: { type: string, required: true}
})

export default mongoose.model<IEmpresa>('Empresas', EmpresaSchema);