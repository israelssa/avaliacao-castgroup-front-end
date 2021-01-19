import { HelperAvaliacao } from './../../../helper/helper-avaliacao';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertType } from '../../../shared/alert-type';
import { MatDialog } from '@angular/material/dialog';
import { take, startWith, map } from 'rxjs/operators';
import { CursoService } from 'src/app/services/curso.service';
import { Observable } from 'rxjs';
import { EnumCategoria } from '../../../shared/enum-categoria';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { CategoriaService } from 'src/app/services/categoria.service';
import { Curso } from 'src/app/shared/curso.model';
import { Categoria } from 'src/app/shared/categoria.model';
import { AuthService } from '../../../services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {

  id: any;
  newForm: FormGroup;
  acao: String;
  loading = false;
  BtnSalvar: any;
  projeto: any;
  nomefuncionario: any;
  titulo: string = 'Novo';
  categorias: any[];
  codigoCategoria: any;
  myControl = new FormControl();
  myControlCategorias = new FormControl();
  returnUrl: string;
  filteredCategorias: Observable<string[]>;
  enumCategoria = EnumCategoria;
  categoriaselecionada: any;
  Keys = [];

  constructor(private _avRoute: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService,
    private cursoService: CursoService,
    private categoriaService: CategoriaService,
    private dateAdapter: DateAdapter<Date>,
    public storageService: StorageService) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  ngOnInit() {

    if (!this.storageService.isUserLogged()) {
      this.router.navigate(['/login'])
    }

    this.loading = true;

    if (this._avRoute.snapshot.queryParamMap.get("returnUrl"))
      this.returnUrl = this._avRoute.snapshot.queryParamMap.get("returnUrl").replace("/", "").split("?")[0];

    if (this._avRoute.snapshot.queryParamMap.get("operacao") == "new") {
      this.acao = "Cadastrar ";
      this.biuldScreemNewMode();
    }

    if (this._avRoute.snapshot.queryParamMap.get("operacao") == "edit") {
      this.acao = "Editar ";
      this.id = this._avRoute.snapshot.queryParamMap.get("id");
      this.biuldScreemEditMode();
    }

    this.loading = false;
  }

  private _filterCategorias(value: string): string[] {
    const filterValueCategorias = value.toLowerCase();
    return this.categorias.filter(option => option.descricao.toLowerCase().includes(filterValueCategorias));
  }

  cancelar() {
    this.router.navigate([this.returnUrl], { queryParams: { atendimentofuncionario: false }, skipLocationChange: true });
  }

  save() {
    if (!this.newForm.valid) {
      return;
    }

    let idVal = this.newForm.value.id;
    let obj = {
      id: idVal,
      descricao: this.newForm.value.descricao,
      dataInicio: this.newForm.value.dataInicio,
      dataTermino: this.newForm.value.dataTermino,
      qdtAlunos: this.newForm.value.qtdAlunos,
      idCategoria: this.newForm.value.categoria
    }

    console.log(obj)
    if (idVal) {
      this.cursoService.update(obj)
        .then(() => {
          HelperAvaliacao.showNotification('Atualizado com Sucesso!', AlertType.Success);
        }, error => {
          HelperAvaliacao.showNotification(error.error.message, AlertType.Error);
        });
    } else {
      this.cursoService.validar(obj)
        .then(item => {
          this.cursoService.save(obj)
            .then(item => {
              HelperAvaliacao.showNotification('Salvo com Sucesso!', AlertType.Success);
              this.router.navigate([this.returnUrl]);
            }, error => {
              HelperAvaliacao.showNotification(error.error.message, AlertType.Error);
            });
        }, error => {
          HelperAvaliacao.showNotification(error.error.message, AlertType.Warning);
        });
    }
  }

  buildForm() {

    this.categoriaService.getList().then((item: Categoria[]) => {
      this.categorias = item;
    }, error => {
      HelperAvaliacao.showNotification(error.error.message, AlertType.Error);
      this.loading = false
    });

    this.newForm = new FormGroup({
      'id': new FormControl(),
      'descricao': new FormControl(''),
      'categoria': new FormControl(''),
      'dataInicio': new FormControl(''),
      'dataTermino': new FormControl(''),
      'qtdAlunos': new FormControl(''),
      'enumcategoria': new FormControl('')
    });
  }

  buildValuesForm() {
    this.categoriaselecionada = "";
    this.cursoService.get(this.id).then((curso: Curso) => {
      console.log("Curso", curso)
      this.newForm.controls['id'].patchValue(curso.id);
      this.newForm.controls['descricao'].patchValue(curso.descricao);
      this.newForm.controls['dataInicio'].patchValue(curso.dataInicio);
      this.newForm.controls['dataTermino'].patchValue(curso.dataTermino);
      this.newForm.controls['qtdAlunos'].patchValue(curso.qtdAlunos);
      this.newForm.controls['categoria'].patchValue(curso.idCategoria);
      this.categoriaselecionada = curso.idCategoria;
    });
  }

  biuldScreemNewMode() {
    this.titulo = "Novo Registro";
    this.buildForm();
  }

  biuldScreemEditMode() {
    this.titulo = "Editar Registro";
    this.buildForm();
    this.buildValuesForm();
  }

  sair() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
