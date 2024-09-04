import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchForFriendsDialogComponent } from './search-for-friends-dialog.component';

describe('SearchForFriendsDialogComponent', () => {
  let component: SearchForFriendsDialogComponent;
  let fixture: ComponentFixture<SearchForFriendsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchForFriendsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchForFriendsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
