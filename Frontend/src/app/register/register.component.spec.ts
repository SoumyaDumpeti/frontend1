import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { User } from '../model/User';
import { Admin } from '../model/Admin';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let userServiceMock: jasmine.SpyObj<UserService>;
  let routerMock: jasmine.SpyObj<Router>;
  

  beforeEach(() => {
    userServiceMock = jasmine.createSpyObj('UserService', ['createUser', 'createAdmin']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);



    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [RegisterComponent],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: Router, useValue: routerMock },
        FormBuilder
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.registerForm).toBeTruthy();
    expect(component.registerForm.get('firstName')).toBeTruthy();
    expect(component.registerForm.get('lastName')).toBeTruthy();
    expect(component.registerForm.get('email')).toBeTruthy();
    expect(component.registerForm.get('loginId')).toBeTruthy();
    expect(component.registerForm.get('password')).toBeTruthy();
    expect(component.registerForm.get('confirmPwd')).toBeTruthy();
    expect(component.registerForm.get('contactNum')).toBeTruthy();
  });
  

  it('should create a user successfully', () => {
   
    component.registerForm = component.fb.group({
      registerType: 'user',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      loginId: 'johndoe',
      password: 'password123',
      confirmPwd: 'password123',
      contactNum: '1234567890'
    });

    const mockResponse = { message: 'User Created Successfully' };
    userServiceMock.createUser.and.returnValue(of(mockResponse));

    // Act
    component.onSubmit();

    
  });

  it('should handle user creation failure', () => {
   
    component.registerForm = component.fb.group({
      registerType: 'user',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      loginId: 'johndoe',
      password: 'password123',
      confirmPwd: 'password123',
      contactNum: '1234567890'
    });

    const mockResponse = { message: 'User already exists' };
    userServiceMock.createUser.and.returnValue(of(mockResponse));

    // Act
    component.onSubmit();

    // Assert
    expect(component.duplicateUserStatus).toBeTrue();
  });

  it('should create an admin successfully', () => {
   
    component.registerForm = component.fb.group({
      registerType: 'admin',
      lastName: 'Admin',
      email: 'admin@gmail.com',
      password: 'adminPassword',
      confirmPwd: 'adminPassword'
    });

    const mockResponse = { message: 'Admin Created Successfully' };
    userServiceMock.createAdmin.and.returnValue(of(mockResponse));

    // Act
    component.onSubmit();

  });

  it('should handle admin creation failure', () => {
   
    component.registerForm = component.fb.group({
      registerType: 'admin',
      lastName: 'Admin',
      email: 'admin@gmail.com',
      password: 'adminPassword',
      confirmPwd: 'adminPassword'
    });

    const mockResponse = { message: 'Admin already exists' };
    userServiceMock.createAdmin.and.returnValue(of(mockResponse));

    // Act
    component.onSubmit();

    // Assert
    expect(component.duplicateAdminStatus).toBeTrue();
  });

  it('should handle error during user creation', () => {
   
    component.registerForm = component.fb.group({
      registerType: 'user',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@gmail.com',
      loginId: 'johndoe',
      password: 'password123',
      confirmPwd: 'password123',
      contactNum: '1234567890'
    });

    userServiceMock.createUser.and.returnValue(throwError('Error occurred'));

 
    component.onSubmit();

    
  });

  it('should handle error during admin creation', () => {
   
    component.registerForm = component.fb.group({
      registerType: 'admin',
      lastName: 'Admin',
      email: 'admin@gmail.com',
      password: 'adminPassword',
      confirmPwd: 'adminPassword'
    });

    userServiceMock.createAdmin.and.returnValue(throwError('Error occurred'));

    // Act
    component.onSubmit();

    // Assert
    //expect(console.log).toHaveBeenCalledWith('error in admin creation', 'Error occurred');
  });
});