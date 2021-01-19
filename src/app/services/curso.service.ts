
import { Observable } from 'rxjs/';
import 'rxjs/Operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Curso } from '../shared/curso.model'

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  PATH:string = "curso";

  constructor(private http: HttpClient){ }

  get(id:any){
    return this.http.get(environment.baseUrl+this.PATH+"/"+id)
    .toPromise()
    .then(
        (res: Curso) => {
          return res;
        }
      )
      .catch(
        this._errorHandler
      );
  }

  getList(){
    return this.http.get(environment.baseUrl+this.PATH + "/listar")
    .toPromise()
    .then(
        (res: Curso[]) => res
      )
      .catch(
        this._errorHandler
      );
  }

  delete(id) {
    return this.http.delete(environment.baseUrl + this.PATH + "/delete/" + id)
    .toPromise()
    .then((resposta: Curso) => resposta)
    .catch(this._errorHandler);
  }

  _errorHandler(error: Curso) {
    return Observable.throw(error || "Internal server error");
  }

  save(obj){
    return this.http.post(environment.baseUrl+this.PATH ,(obj))
    .toPromise()
    .then((response: Curso) => HttpErrorResponse)
      .catch(this._errorHandler);
  }

  validar(obj){
    return this.http.post(environment.baseUrl+this.PATH + "/validar",(obj))
    .toPromise()
    .then((response: Curso) => HttpErrorResponse)
      .catch(this._errorHandler);
  }

  update(obj){
    return this.http.put(environment.baseUrl+this.PATH ,(obj))
    .toPromise()
    .then((response: Curso) => response)
    .catch(this._errorHandler);
  }
}
