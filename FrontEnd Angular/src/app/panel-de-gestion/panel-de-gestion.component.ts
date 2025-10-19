import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmpresaService, IEmpresa } from '../services/empresa.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-panel-de-gestion',
  standalone: true,
  imports: [NgIf],
  templateUrl: './panel-de-gestion.component.html',
  styleUrls: ['./panel-de-gestion.component.css'],
})
export class PanelDeGestionComponent implements OnInit {
  empresa?: IEmpresa;

  constructor(
    private route: ActivatedRoute,
    private empresaService: EmpresaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID de la empresa:', id);

    if (id) {
      this.empresaService.obtenerEmpresa(id).subscribe((data) => {
        this.empresa = data;
      });
    }
  }

  goFactura(event: Event, tipo: string) {
    event?.preventDefault();
    this.router.navigate(['/crear-facturas']);
    console.log('Redirigiendo a: ', tipo);
  }
}
