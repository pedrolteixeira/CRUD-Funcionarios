import { Component } from '@angular/core';
import { FuncionarioService } from '../funcionario.service';
import { FuncionarioDataService } from '../funcionario-data.service';
import { Funcionario } from '../funcionario';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  funcionario: any;
  key: any;
  constructor(
    private _funcionarioService: FuncionarioService,
    private _funcionarioDataService: FuncionarioDataService
  ){}

  ngOnInit() {
    this.funcionario = new Funcionario();
    this._funcionarioDataService.funcionarioAtual.subscribe((data: any) => {
      if (data.funcionario && data.key) {
        this.funcionario = new Funcionario();
        this.funcionario.nome = data.funcionario.nome;
        this.funcionario.departamento = data.funcionario.departamento;
        this.key = data.key;
      }
    });
  }

  onSubmit(){
    if (this.key) {
      this._funcionarioService.update(this.funcionario, this.key) 
    } else {
      this._funcionarioService.insert(this.funcionario) 
    }

    this.funcionario = new Funcionario();
    this.key = null;
  }
}
