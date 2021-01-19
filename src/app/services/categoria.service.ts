
import { Observable } from 'rxjs/';
import 'rxjs/Operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Curso } from '../shared/curso.model'
import { Categoria } from '../shared/categoria.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  PATH:string = "categoria";

  constructor(private http: HttpClient){ }

  getList(){
    return this.http.get(environment.baseUrl+this.PATH + "/listar")
    .toPromise()
    .then(
        (res: Categoria[]) => res
      )
      .catch(
        this._errorHandler
      );
  }

  _errorHandler(error: Categoria) {
    return Observable.throw(error || "Internal server error");
  }
}
