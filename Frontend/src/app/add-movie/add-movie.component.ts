import { Component, inject } from '@angular/core';
import { UserService } from '../user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MovieService } from '../movie.service';

import Swal from 'sweetalert2';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css'
})
export class AddMovieComponent {

  userService=inject(UserService)
  movieService=inject(MovieService)
  movie:FormGroup;
 toast=inject(NgToastService)
  displayUserStatus: boolean;
  user: string;
  name: string;
  login: string;
  movies: any;
  bookedTickets:number;
  
  

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(
      (data) => {
        this.user = data.lastName;
      })
      console.log(this.user)

      this.userService.getLoginType().subscribe(
        (data) => {
          this.login = data;
          console.log(data)
        })

        this.movieService.getMovies().subscribe({
          next:(res)=>{
           this.movies=res.payload
           console.log(this.movies)
           this.name=this.movies[0].movieName
           
          }
          })     
       

    
   this.movie=new FormGroup({
     
     image:new FormControl('',[Validators.required]),
     movieName:new FormControl('',[Validators.required]),
     theatreName:new FormControl('',[Validators.required]),
     totalTickets:new FormControl('',[Validators.required]),
     availableTickets:new FormControl('',[Validators.required]),
     price:new FormControl('',[Validators.required]),
     status:new FormControl('',[Validators.required])
    });
    
      
  }
 
  get image(){
    return this.movie.get('image')
  }
  get movieName(){
    return this.movie.get('movieName')
  }
  get theatreName(){
   return this.movie.get('theatreName')
  }
  get totalTickets(){
    return this.movie.get('totalTickets')
  }
  get availableTickets(){
    return this.movie.get('availableTickets')
  }
  get price(){
    return this.movie.get('price')
  }
  get status(){
    return this.movie.get('status')
  }

 

 

  submit(){
        
      // formData obj preparation

        // movie Object from NgForm Obj
      let  movieObj=this.movie.value
      
      let data={
        image:movieObj.image,
        movieName:movieObj.movieName,
        theatreName:movieObj.theatreName,
        totalTickets:movieObj.totalTickets,
        availableTickets:movieObj.availableTickets,
        price:movieObj.price,
        status:movieObj.status


      }
      console.log(data)
       
      //append movie obj by converting it to string
         // pass form data obj to service to make POST req
    this.movieService.createMovie(data).subscribe(
       (res)=>{
        console.log(res)
         this.onReset()
        if(res.message==="movie added successfully"){
          // Swal.fire({
          //   title:'Success',
          //   text:'Movie added',
          //   icon:'success',
          //   position:'center',
          //   timer:3000,
          //   confirmButtonText:'OK'
          // })
          
          
  
        }else{
          this.displayUserStatus=true;
        }
      },
       (error)=>{console.log(error)}
       );
  
}



onReset(){
  this.movie.reset()
  this.movie.markAsPristine();
  this.movie.markAsUntouched

}





}
        
 