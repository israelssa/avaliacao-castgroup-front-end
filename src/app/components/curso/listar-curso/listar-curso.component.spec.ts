import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarCursoComponent } from './listar-curso.component';

describe('CursoComponent', () => {
  let component: ListarCursoComponent;
  let fixture: ComponentFixture<ListarCursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarCursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});