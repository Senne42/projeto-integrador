import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ComandosPage } from './comandos.page';

describe('ComandosPage', () => {
  let component: ComandosPage;
  let fixture: ComponentFixture<ComandosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComandosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ComandosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
