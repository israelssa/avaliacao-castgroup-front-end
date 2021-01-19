import { EnumCategoria } from './enum-categoria'

export interface Curso {
    id: number,
    descricao: string,
    dataInicio: Date,
    dataTermino: Date,
    qtdAlunos: number;
    idCategoria: number;
}