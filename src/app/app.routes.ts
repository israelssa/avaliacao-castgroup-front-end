import { Routes } from '@angular/router'

import { HomeComponent } from './components/home/home.component'
import { CursoComponent } from './components/curso/curso/curso.component'
import { LoginComponent } from './components/login/login.component'
import { ListarCursoComponent } from './components/curso/listar-curso/listar-curso.component'


export const ROUTES: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: LoginComponent },
    { path: 'curso', component: CursoComponent },
    { path: 'listar-curso', component: ListarCursoComponent },
    { path: 'home/:id', component: HomeComponent, 
        children: [
            { path: '', component: LoginComponent }
        ] 
    }
]