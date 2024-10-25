import { Component, Inject, inject } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../model/movie';
import { ActivatedRoute, Router } from '@angular/router';

import Swal from 'sweetalert2';
import { UserService } from '../user.service';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {
  movieService=inject(MovieService)
  movies:Movie[]=[];
  
 
  router=inject(Router)
  toast=inject(NgToastService)
  status: boolean=false;
  userService=inject(UserService)
  isUser: boolean;
 
  isPopupOpen: boolean;
  numberOfTickets=0;
  bookedTickets: number;
   movieName:string;
  user: string;
  
 

  ngOnInit(): void {
 
    this.movieService.getMovies().subscribe({
     next:(res)=>{
      
      console.log(res)
      this.movies=res.payload
     
     }
     
    
     
    })

    this.userService.getCurrentUser().subscribe(
      (data) => {
        this.user = data.lastName;
      })
      console.log(this.user)

    this.userService.getLoginType().subscribe(
      (res)=>{
      this.isUser=res==='user';
      })
      console.log(this.isUser)

     this.userService.getUserLoginStatus().subscribe({
      next:(userLoginStatus)=>this.status=userLoginStatus
     })
     
     
     
       
    
  }
  
  login(){
    
   this.router.navigate(['/login'])
   
   Swal.fire({
    title:'Info',
    text:'Can you please Login to View More',
    icon:'info',
    position:'center',
    timer:4000,
    confirmButtonText:'OK'
  })

    

  }

  bookTicket(name){
    
 
    this.router.navigate([`/bookTicket/${name}`]);
    
  }

  deleteMovie(movieName){
    this.movieService.deleteMovie(movieName).subscribe(
      (res)=>{ 
         console.log('res',res)
        this.movieService.getMovies()
      }
      )

  }

   openForm(name) {
    this.isPopupOpen=true
    this.movieName=name
    
  }
  
   closeForm() {
    this.isPopupOpen=false
  }

  update():void{
    this.movieService.updateStatus(this.movieName,this.numberOfTickets).subscribe(
       (res)=>{ 
        console.log(res)
         if(res.message==='SOLD OUT'){
          Swal.fire({
            title:'Info',
            text:'SOLD OUT',
            icon:'info',
            position:'center',
            timer:4000,
            confirmButtonText:'OK'
          })
        }
         else{ 
          Swal.fire({
            title:'Info',
            text:'BOOK ASAP',
            icon:'info',
            position:'center',
            timer:4000,
            confirmButtonText:'OK'
          })
          }
     
       },
       (err)=>{
         console.log("Error in Updating...",err)
       }
     
     )
   }

  

}
