import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchBarcodePage } from './search-barcode.page';

describe('SearchBarcodePage', () => {
  let component: SearchBarcodePage;
  let fixture: ComponentFixture<SearchBarcodePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarcodePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
