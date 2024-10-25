import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  httpClient = inject(HttpClient);
  bookingData: any;
  setBookingData(data: any) {
    this.bookingData = data;
  }

  createMovie(movieObj):Observable<any>{
    let token=localStorage.getItem('token') 
   const headers = {'Authorization':`Bearer ${token}`}
    return  this.httpClient.post<any>('http://localhost:4000/movie-api/movie',movieObj,{headers:new HttpHeaders(headers)});
  }

  getMovies(): Observable<any> {
    return this.httpClient.get<any>(`http://localhost:4000/movie-api/all`)
  }
  

  bookTickets(data): Observable<any> {
    let token=localStorage.getItem('token') 
    const headers = {'Authorization':`Bearer ${token}`}
    
    return this.httpClient.post<any>(`http://localhost:4000/ticket-api/bookTicket`,data,{headers:new HttpHeaders(headers)})
  }

  displayMovieById(moviename){
    let token=localStorage.getItem('token') 
    const headers = {'Authorization':`Bearer ${token}`}
    return this.httpClient.get<any>(`http://localhost:4000/movie-api/search/${moviename}`,{headers:new HttpHeaders(headers)})

  }

  updateStatus(movieName:string,ticket:number): Observable<any> {
    let tickets=ticket
    let token=localStorage.getItem('token') 
    const headers = {'Authorization':`Bearer ${token}`}

    return this.httpClient.post(`http://localhost:4000/movie-api/${movieName}/add`,{tickets},{headers:new HttpHeaders(headers)})
  }

  deleteMovie(movieName:string){
    let token=localStorage.getItem('token') 
    const headers = {'Authorization':`Bearer ${token}`}

    return this.httpClient.delete(`http://localhost:4000/movie-api/${movieName}/delete`,{headers:new HttpHeaders(headers)})

  }

}
