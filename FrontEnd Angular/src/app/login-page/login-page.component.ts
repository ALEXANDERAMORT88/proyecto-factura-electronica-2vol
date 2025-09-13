import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'] 
})
export class LoginPageComponent {

  // 
  constructor (private router: Router) {}

  //Método para ridirigir a Register
  goRegister(event: Event, tipo: string) {
    event.preventDefault()
    this.router.navigate(['/register'])
    console.log('Redirigiendo a:', tipo);
  }
}
