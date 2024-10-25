import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './model/User';
import { HttpClient } from '@angular/common/http';
import { Admin } from './model/Admin';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { AddMovieComponent } from './add-movie/add-movie.component';
import { MovieService } from './movie.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpClient=inject(HttpClient)

  userLoginStatus = new BehaviorSubject<boolean>(false)
  setUserLoginStatus(value: boolean) {
    this.userLoginStatus.next(value)
  }
  getUserLoginStatus() {
    return this.userLoginStatus.asObservable()
  }
  

  currentUser = new BehaviorSubject<User>({
    firstName: ' ',
    lastName: ' ',
    email: ' ',
    loginId: ' ',
    password: ' ',
    confirmPwd: ' ',
    contactNum: ' ',
  })

  getUserEmail(): string {
    const email = localStorage.getItem('email');
    return email !== null ? email : '';
  }
  setCurrentUser(user: User) {
    this.currentUser.next(user)
  }
  getCurrentUser() {
    return this.currentUser.asObservable()
  }

  loginType = new BehaviorSubject<string>("")
  setLoginType(type): any {
    this.loginType.next(type);
  }
  getLoginType() {
    return this.loginType.asObservable();
  }

 
   //create User
   createUser(newUser: User): Observable<any> {
    console.log(newUser,'service')
    return this.httpClient.post<any>('http://localhost:4000/user-api/register', newUser);
  }


  //create Seller
  createAdmin(newAdmin: Admin): Observable<any> {
    console.log(newAdmin)
    return this.httpClient.post<any>('http://localhost:4000/admin-api/admin', newAdmin);
  }
 
  userLogin(userCredObj: Object): Observable<any> {
    return this.httpClient.post('http://localhost:4000/user-api/login', userCredObj)

  }

  // Seller login

  adminLogin(sellerCredObj: Object): Observable<any> {
    return this.httpClient.post('http://localhost:4000/admin-api/admin-login', sellerCredObj)

  }

}
