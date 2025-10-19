import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { PanelDeGestionComponent } from './panel-de-gestion/panel-de-gestion.component';
import { CrearFacturasComponent } from './crear-facturas/crear-facturas.component';

export const routes: Routes = [
    {path: '', component: HomePageComponent},
    {path: 'login', component: LoginPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'panel-de-gestion/:id', component: PanelDeGestionComponent},
    {path: 'crear-facturas', component: CrearFacturasComponent }
];
