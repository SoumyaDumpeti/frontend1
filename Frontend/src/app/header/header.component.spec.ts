import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { UserService } from '../user.service';
import { of, throwError } from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    // Create a mock UserService
    userServiceMock = jasmine.createSpyObj('UserService', ['getLoginType', 'getUserLoginStatus', 'setUserLoginStatus', 'setCurrentUser']);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize isUser based on user role', () => {
    
    userServiceMock.getLoginType.and.returnValue(of('user'));
    userServiceMock.getUserLoginStatus.and.returnValue(of(true));

    // Act
    component.ngOnInit();
    
    // Assert
    expect(component.isUser).toBeTrue();
    expect(component.status).toBeTrue();
  });

  it('should handle error when getting login type', () => {
    
    userServiceMock.getLoginType.and.returnValue(throwError('error'));
    userServiceMock.getUserLoginStatus.and.returnValue(of(true));

    // Act
    component.ngOnInit();

    // Assert
    expect(component.isUser).toBeFalse(); // Default value
   
  });

  it('should log out user correctly', () => {
    // Act
    component.userLogout();

    // Assert
    expect(localStorage.getItem('token')).toBeNull();
    expect(userServiceMock.setUserLoginStatus).toHaveBeenCalledWith(false);
    expect(userServiceMock.setCurrentUser).toHaveBeenCalledWith({
      firstName: ' ',
      lastName: ' ',
      email: ' ',
      loginId: ' ',
      password: ' ',
      confirmPwd: ' ',
      contactNum: ' ',
    });
  });
});