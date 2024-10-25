import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../movie.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../model/User';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrl: './book-ticket.component.css'
})
export class BookTicketComponent implements OnInit {
  ticketBookingForm!:FormGroup
  submitted = false;
  selectedSeats: number[] = [];
  showTime!:string;
  email!:String;
  noOfTickets!:number;
  totalPrice2!:number;
 

  movieImage!: string | null;
  movieOverview!: string | null;
  movieTitle!: string | null;

  message: String = "";
  isProcess: boolean = false;
  className = 'd-none'; //display none for alert in Html

  seatsContainer!: HTMLElement;
  seats!: NodeListOf<Element>;
  countOfSeats!: HTMLElement;
  total!: HTMLElement;
  noOfTicketSelected!: HTMLSelectElement;
  oneTicketPrice: number = 100;
  totalPrice: number = 0;
  text!: HTMLElement;
  moviename: string;
  movies: any;


  constructor(private formBuilder: FormBuilder,
     private auth:UserService, 
     private route:ActivatedRoute, 
     private router:Router,
     private bookingService: MovieService)
    {
  }

  ngOnInit(): void {
    this.seatsContainer = document.querySelector('.seatsContainer')!;
    this.seats =document.querySelectorAll('.row .seat:not(.Occupied)');
    this.countOfSeats = document.getElementById('countS') as HTMLElement;
    this.total = document.getElementById("total") as HTMLElement;
    this.noOfTicketSelected = document.getElementById("tickets") as HTMLSelectElement;
    this.text = document.getElementById("text") as HTMLElement;
    this.totalPrice = +this.noOfTicketSelected.value * this.oneTicketPrice;
    this.populateUI();
    this.updateSelectedCount();
    this.seatsContainer.addEventListener("click", this.handleSeatClick);
    this.moviename = this.route.snapshot.paramMap.get('moviename')
    this.bookingService.displayMovieById(this.moviename).subscribe((res)=>{console.log(res)})

    this.ticketBookingForm = this.formBuilder.group(
      {
        email:['', Validators.required],
        showTime:['', Validators.required],
        noOfTickets:['', Validators.required],
        seats:['', Validators.required]
      }
    )

      this.bookingService.displayMovieById(this.moviename).subscribe(
        (s) => {
          console.log(s)
          this.movies = s.payload[0];
          console.log(s.payload[0])
        },
        (error) => {
          console.log("Error in displaying", error)
        }
      )

   
      this.movieImage = this.movies.image|| '';
      this.moviename =this.movies.movieName|| '';
    
   

    this.auth.getCurrentUser().subscribe({
      next: (user: User) => {
        
        this.email = user.lastName
      
      },
      error: (err) => { console.log("Error in getting email", err) } });
  }


  
  updateSelectedCount(): void{
    const seatSelected = document.querySelectorAll('.row .seat.Selected');
    this.selectedSeats = Array.from(seatSelected).map(seat => {
      return Array.from(document.querySelectorAll('.seat')).indexOf(seat);
    });

    const seatCount = seatSelected.length;
    const seatIndex = Array.from(seatSelected).map(function(seat){
      return Array.from(document.querySelectorAll(".seat")).indexOf(seat);
    });
    localStorage.setItem("seatSelected", JSON.stringify(seatIndex));
    this.countOfSeats.innerText = seatCount.toString();
    this.total.innerText = this.totalPrice.toString();
    this.text.innerText = seatIndex.join(", ");;
  }

  populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('seatSelected') || '[]');
    if (selectedSeats !== null && selectedSeats.length > 0) {
      this.seats.forEach((seat, index) => {
        if (selectedSeats.indexOf(index) > -1) {
          seat.classList.add('Selected');
        }
      });
    }
  }

  ticketSelectedChange(e:Event){
    this.totalPrice = +this.noOfTicketSelected.value * this.movies.price;
    console.log(+this.noOfTicketSelected.selectedIndex);
    this.updateSelectedCount();
  }
 handleSeatClick = (e: Event) => {
    if ((<HTMLElement>e.target).classList.contains("seat") && !(<HTMLElement>e.target).classList.contains("Occupied")) {
      (<HTMLElement>e.target).classList.toggle("Selected");
    }
    this.updateSelectedCount();
  }

  bookingFunction() {
    email:this.email,

    this.isProcess = true;

  
    const data = {
      
      movieName:this.moviename,
      theatreName:this.movies.theatreName,
      numberOfTickets: this.ticketBookingForm.value.noOfTickets,
      seatNumbers: this.selectedSeats
    };

   showTime: this.ticketBookingForm.value.showTime;
   
    this.totalPrice= this.totalPrice;
  
    this.bookingService.bookTickets(data).subscribe(
      (res) => {
        console.log(res)
        if (res) {
           this.bookingService.setBookingData(data);
          // Assuming the response contains a success flag or message
          console.log('ticket booked Successfully', res);
          if(res.message==="Tickets booked successfully"){

          
          Swal.fire({
            title:'Success',
            text:'Your ticket was booked Successfully',
            icon:'success',
            position:'center',
            timer:3000,
            confirmButtonText:'OK'
          })
        }
          // Clear the form and reset variables
          this.ticketBookingForm.reset();
          this.selectedSeats = [];
          this.isProcess = false;
          // Redirect to the checkout component
         // this.router.navigate(['/checkout']);
        } else {
          console.log('Booking failed:', res);
          this.isProcess = false;
          this.message = res.message;
          this.className = 'alert alert-danger';
        }
      },
      (error) => {
        console.log('Error occurred:', error);
        this.isProcess = false;
        // Handle error case, display appropriate message to the user
      }
    );
    }


}
