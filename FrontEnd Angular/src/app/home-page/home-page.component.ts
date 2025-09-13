import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'] 
})
export class HomePageComponent {

  constructor (private router: Router) {}
  
  // controlar el menú si está desplegado o no
  menuDesplegado = false;

  // Método para desplegar el menú
  displayMenu() {
    this.menuDesplegado = true;
  }

  // Método para cerrar el menú
  closeMenu() {
    this.menuDesplegado = false;
  }

  // Método para redirigir a Login
  goLogin(tipo: string) {
    this.router.navigate(['/login'])
    console.log('Login', tipo);
  }
}
