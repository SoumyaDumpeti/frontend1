import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  fb: FormBuilder = inject(FormBuilder);
  userService = inject(UserService);
  router = inject(Router);

  userCredentialsError = {
    userCredErrStatus: false,
    userCredErrMsg: ""
  }

  userCredentials = this.fb.group({
    loginType: [''],
    email:['',Validators.required],
    password: ['', Validators.required],
  })

  get email() {
    return this.userCredentials.get('email')
  }
  get password() {
    return this.userCredentials.get('password')
  }
  

  onSubmitUser() {
    const formData = this.userCredentials.value;
    if (formData.loginType === 'user') {
      this.userService.userLogin(this.userCredentials.value).subscribe({
        next: (res) => {
          console.log(res)
          if (res.message ==="login success") {
            // Swal.fire({
            //   title:'Success',
            //   text:'Login was Successful',
            //   icon:'success',
            //   position:'center',
            //   timer:3000,
            //   confirmButtonText:'OK'
            // })


            localStorage.setItem('token', res.token);

            this.userService.setUserLoginStatus(true);
            this.userService.setCurrentUser(res.user);
            console.log(res.user,'user')
            this.userService.setLoginType(formData.loginType);

            this.router.navigate([`/movies`]);
          }
          else {
            this.userCredentialsError = {
              userCredErrStatus: true,
              userCredErrMsg: res.message
            }
          }
        }, error: (error) => {
          console.log('err in user login', error);
        }
      })
    }
   if (formData.loginType === 'admin') {
     this.userService.adminLogin(formData).subscribe({
        next: (res) => {
          console.log(res)
          if (res.message === "Login Success") {
            // Swal.fire({
            //   title:'Success',
            //   text:'Login was Successful',
            //   icon:'success',
            //   position:'center',
            //   timer:3000,
            //   confirmButtonText:'OK'
            // })
            localStorage.setItem('token', res.token)
            this.userService.setUserLoginStatus(true)
            this.userService.setCurrentUser(res.admin)
            
            this.userService.setLoginType(formData.loginType)


            this.router.navigate([`/addMovie`])

          }
        },
        error: (error) => {
          console.log('err in admin login', error)
        }
      })
    }

  }

}
