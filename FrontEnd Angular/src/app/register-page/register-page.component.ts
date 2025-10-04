import { Component, signal } from '@angular/core';
import { EmpresaService } from '../services/empresa.service';

import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css'],
})
export class RegisterPageComponent {
  //Controlamos que la sección de Compras
  buttonHideBuys = signal(true);

  // Controlamos si el formulario se muestra o no
  buttonHideForm = signal(false);

  //Método para mostrar la sección de compras
  showBuys() {
    this.buttonHideBuys.set(true);
  }

  // Método para ocultar la sección de cmopras
  hideBuys() {
    this.buttonHideBuys.set(false);
  }

  // Método para mostrar el formulario.
  showForm() {
    this.buttonHideForm.set(true);
    this.hideBuys();
  }
  // Método para ocultar el formulario.
  hideForm() {
    this.buttonHideForm.set(false);
    this.showBuys();
  }

  // Propiedad para el formulario reactivo
  registerForm!: FormGroup;
  submitted = false; // Controlamos el estado del envío del formulario.

  constructor(private fb: FormBuilder, private router: Router, private authService: EmpresaService) {
    this.registerForm = this.fb.group(
      {
        tipoDocumento: ['', Validators.required],
        nombre: ['', Validators.required],
        celular: ['', Validators.required],
        numeroDocumento: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        confirmacionEmail: ['', [Validators.required, Validators.email]],
        passwordIngreso: ['', [Validators.required, Validators.minLength(6)]],
        confirmacionPassword: ['', Validators.required],
      },
      {
        validators: [this.emailMatchValidator, this.passwordMatchValidator], // 👈 agregamos el validador personalizado
      }
    );
  }

  // // Getter Para acceder facimente a los campos del formulario
  get f() {
    return this.registerForm.controls;
  }

  // Validar que los emails coincidan
  emailMatchValidator(group: AbstractControl): ValidationErrors | null {
    const email = group.get('email')?.value;
    const confirmarEmail = group.get('confirmacionEmail')?.value;

    return email && confirmarEmail && email !== confirmarEmail
    ? {emailMismatch: true}
    : null; 
  }

  // Valildar que las contraseñas coincidad 
  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('passwordIngreso')?.value;
    const confirmarPassword = group.get('confirmarPassword')?.valid

    return password && confirmarPassword !== confirmarPassword
    ? {passwordMismatch: true}
    : null;
  }

  // Método para el envio del formulario
  onSubmit() {
    this.submitted = true;

    // Se detiene aquí si el formulario se inválido
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    if (this.f['email'].value !== this.f['confirmacionEmail'].value) {
      this.f['confirmacionEmail'].setErrors({ emailMismatch: true });
      return;
    }

    // Validar que las contraseñas coincidan
    if (
      this.f['passwordIngreso'].value !== this.f['confirmacionPassword'].value
    ) {
      this.f['confirmacionPassword'].setErrors({ passwordMismatch: true });
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: (res: any)=> {
        console.log("Registro exitoso: ", res);
        const id = res.empresa?._id || res._id; // se realiza el cambio para que lo pueda soportar Node o PHP.
        this.router.navigate(['/panel-gestion', id]);
      },
      error: (err)=> {
        console.error("Error en el registro", err);
      }
    })

    // Guardamos de momento los datos en LocalStorage
    localStorage.setItem('empresaData', JSON.stringify(this.registerForm.value));
    // si todo es valido, aquí creamos la lógica de envio de datos.
    console.log('Formulario válido, datos guardados: ', this.registerForm.value);
  }
}
