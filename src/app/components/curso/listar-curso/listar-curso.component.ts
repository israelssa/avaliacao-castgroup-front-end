import { AlertType } from 'src/app/shared/alert-type';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HelperAvaliacao } from '../../../helper/helper-avaliacao';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { take } from 'rxjs/operators';
import { CursoService } from 'src/app/services/curso.service';
import { StorageService } from 'src/app/services/storage.service';
import { Curso } from 'src/app/shared/curso.model';

@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent implements OnInit {

  curso: any[] = [];
  dataSourceCurso = new MatTableDataSource<any[]>();
  displayedCursoColumns: string[] = [];
  loading = false;
  exibirgrid = false;
  columnNamesCurso = [
    { id: 'id', value: 'Id' },
    { id: 'descricao', value: 'Descrição' },
    { id: 'dataInicio', value: 'Data Inicio' },
    { id: 'dataTermino', value: 'Data Término' },
    { id: 'descricaoCategoria', value: 'Categoria' },
    { id: 'acao', value: '' }
  ];

  @ViewChild('paginatorCurso') paginatorCurso: MatPaginator;
  @ViewChild(MatSort) sortCurso: MatSort;

  itemsPerPageLabel = 'Registros por Página';
  nextPageLabel = 'Próximo';
  previousPageLabel = 'Anterior';
  firstPageLabel = 'Primeira Página';
  lastPageLabel = 'Última Página';

  constructor(private cursoService: CursoService, private router: Router, 
    public authService: AuthService,
    public storageService: StorageService) {
    this.columnsCurso();
   }

  ngOnInit() {
    if (!this.storageService.isUserLogged()) {
      this.router.navigate(['/login'])
    }
    this.loading = true;
    this.getList();
  }

  getList() {
    this.cursoService.getList().then((item: Curso[]) => {
        this.curso = item;
        console.log("Cursos", this.curso)
        this.carregarGrid();
      }, error => {
        HelperAvaliacao.showNotification(error.error.message, AlertType.Error);
        this.loading = false
      });
  }

  carregarGrid() {
    this.dataSourceCurso = new MatTableDataSource(this.curso);
    this.dataSourceCurso.paginator = this.paginatorCurso;
    this.dataSourceCurso.sort = this.sortCurso;
    this.loading = false;
    this.exibirGrid();
  }

  exibirGrid() {
    if (this.curso.length > 0) {
      this.exibirgrid = true;
    } else {
      this.exibirgrid = false;
    }
  }

  add() {
    this.router.navigate(['curso'], {queryParams : {operacao: 'new', returnUrl: this.router.url}, skipLocationChange: true});
  }

  edit(id) {
    this.router.navigate(['curso'], { queryParams : {operacao: 'edit', id:id, returnUrl: this.router.url}, skipLocationChange: true });
  }

  delete(id: any) {
    if (window.confirm('Tem certeza que você quer apagar este item?')) {
      this.cursoService.delete(id).then(
        (data) => {
          this.getList();
          HelperAvaliacao.showNotification("Excluido com sucesso", AlertType.Success);
        },
        error => {
          HelperAvaliacao.showNotification("Erro ao excluir", AlertType.Error);
        }
      )
    }
  }

  columnsCurso() {
    this.displayedCursoColumns = this.columnNamesCurso.map(x => x.id);
  }

  applyFilterCurso(value) {
    this.dataSourceCurso.filter = value.trim().toLowerCase();
  }

  sair() {
    this.authService.logout()
    this.router.navigate(['/login'])
  }

}
