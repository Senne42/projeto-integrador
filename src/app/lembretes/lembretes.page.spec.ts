import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LembretesPage } from './lembretes.page';

describe('LembretesPage', () => {
  let component: LembretesPage;
  let fixture: ComponentFixture<LembretesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LembretesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LembretesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
