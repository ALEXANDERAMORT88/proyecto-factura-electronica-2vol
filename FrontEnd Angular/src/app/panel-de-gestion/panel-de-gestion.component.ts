import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresaService, IEmpresa} from '../services/empresa.service'
import { from } from 'rxjs';
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-panel-de-gestion',
  standalone: true,
  imports: [NgIf],
  templateUrl: './panel-de-gestion.component.html',
  styleUrls: ['./panel-de-gestion.component.css'],
})
export class PanelDeGestionComponent implements OnInit {
  
  empresa?: IEmpresa;

  constructor (
     private route: ActivatedRoute,
    private empresaService: EmpresaService
  ) {}

  ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      console.log('ID de la empresa:', id);

      if (id) {
        this.empresaService.obtenerEmpresa(id).subscribe(data => {
          this.empresa = data;
        })
      }
  }
}