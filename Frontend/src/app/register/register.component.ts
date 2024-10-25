import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { Admin } from '../model/Admin';
import { User } from '../model/User';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  ngOnInit() {
    this.registerForm = this.fb.group({
      registerType: 'user',
      firstName: ['', Validators.required],
      lastName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6)]],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_.+-]+@(gmail\.com|email\.com)$/)]],
      loginId: ['', Validators.required],
      password: ['', Validators.required],
      confirmPwd: ['', Validators.required],
      contactNum: ['', Validators.required]

    })
  }


  
  
  get firstName(){
    return this.registerForm.get('firstName')
  }
  get lastName(){
    return this.registerForm.get('lastName')
  }
  get email(){
    return this.registerForm.get('email')
  }
  get loginId(){
    return this.registerForm.get('loginId')
  }
  get password(){
    return this.registerForm.get('password')
  }
  get confirmPwd(){
   return this.registerForm.get('confirmPwd')
  }
  get contactNum(){
    return this.registerForm.get('contactNum')

  }
 

  duplicateUserStatus: boolean = false;
  duplicateAdminStatus: boolean = false;
  router = inject(Router)
  userService = inject(UserService);
  // toast = inject(NgToastService)
  registerForm: FormGroup;
  fb: FormBuilder = inject(FormBuilder);

 


  onSubmit() {
     const formData = this.registerForm.value;
      if (formData.registerType === 'user') {
        let { firstName,lastName, email,loginId, password, confirmPwd,contactNum} = this.registerForm.value;
        let newUser = new User(firstName,lastName, email,loginId, password, confirmPwd,contactNum);
        console.log(newUser,'newUser')
        this.userService.createUser(newUser).subscribe({
          next: (res) => {
            console.log(res)

            if (res.message ==='User created') {
              // Swal.fire({
              //   title:'Success',
              //   text:'Registration was Successful',
              //   icon:'success',
              //   position:'center',
              //   timer:3000,
              //   confirmButtonText:'OK'
              // })
              this.router.navigate(['/login'])
            }
            else {
              this.duplicateUserStatus = true;
            } },
          error: (error) => {
            console.log('error in user creation', error)
          }
        })
      }

      if(formData.registerType === 'admin') {
        let { lastName,email,password,confirmPwd } = this.registerForm.value;
        let newAdmin = new Admin(lastName,email,password,confirmPwd );
        this.userService.createAdmin(newAdmin).subscribe({
          next: (res) => {
            if (res.message === "Admin Created Successfully") {
              this.router.navigate(['/login'])
              // Swal.fire({
              //   title:'Success',
              //   text:'Registration was Successful',
              //   icon:'success',
              //   position:'center',
              //   timer:3000,
              //   confirmButtonText:'OK'
              // })
            }
            else {
              this.duplicateAdminStatus = true;
            }
          },
          error: (error) => {
            console.log('error in admin creation', error)
          }
        })
      }
    
  }

}
