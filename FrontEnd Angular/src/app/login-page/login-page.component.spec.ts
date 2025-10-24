import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { FormsModule } from '@angular/forms';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { EmpresaService } from '../services/empresa.service';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent, FormsModule],
      providers: [EmpresaService, provideHttpClient(withInterceptorsFromDi()) ,provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('Deberia crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });
  it('Debe tener campos de email y password vacíos por defecto', () => {
    expect(component.email).toBe('');
    expect(component.passwordIngreso).toBe('');
  });
});
