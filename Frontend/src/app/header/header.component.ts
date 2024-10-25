import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userService=inject(UserService)
  status:boolean;
  isUser:boolean=false;
  ngOnInit():void{
 
   this.userService.getLoginType().subscribe(
     (res)=>{
     this.isUser=res==='user';
     },
     (error)=>{
       console.log("error in getting role",error)
     }
         
       )
   
  this.userService.getUserLoginStatus().subscribe({
   next:(userLoginStatus)=>this.status=userLoginStatus
  })
  }
 
  userLogout() {
   //reset current user
   localStorage.removeItem('token')
   this.userService.setUserLoginStatus(false)
   this.userService.setCurrentUser({
     firstName: ' ',
     lastName: ' ',
     email: ' ',
     loginId: ' ',
     password: ' ',
     confirmPwd: ' ',
     contactNum: ' ',
   })
 }
 

}
