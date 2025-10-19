import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresaService } from '../services/empresa.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  email: string = '';
  passwordIngreso: string = '';
  erroMsg: string = '';

  //
  constructor(private router: Router, private empresaService: EmpresaService) {}

  //Método para ridirigir a Register
  goRegister(event: Event, tipo: string) {
    event.preventDefault();
    this.router.navigate(['/register']);
    console.log('Redirigiendo a:', tipo);
  }

  onLogin() {
    this.empresaService.login(this.email, this.passwordIngreso).subscribe({
      next: (response) => {
        console.log('Login exitoso ✅', response);
        //Guardar info en localStorage es alternativo
        // localStorage.setItem('empresa', JSON.stringify(response.empresa));
        //Redirigir a panel de gestion
        this.router.navigate(['/panel-de-gestion', response.empresa._id]);
      },
      error: (err) => {
        console.error('Error al iniciar sesión ❌', err);
        this.erroMsg = err.error?.message || 'Usuario no registrado';
      },
    });
  }
}
