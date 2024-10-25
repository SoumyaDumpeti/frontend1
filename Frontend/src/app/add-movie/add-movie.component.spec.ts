import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddMovieComponent } from './add-movie.component';
import { UserService } from '../user.service';
import { MovieService } from '../movie.service';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { NgToastService } from 'ng-angular-popup';

class MockUserService {
  movie: any;
  getCurrentUser() {
    return of({ lastName: 'Doe' });
  }

  getLoginType() {
    return of('admin');
  }
  createMovie = () => {
    if(this.movie.value === undefined) {return}
  }
}

class MockMovieService {
  getMovies() {
    return of({payload: [{ movieName: 'Test Movie' }] } );
  }

  createMovie(data: any) {
    return of({ message: "movie added successfully" });
  }
}

class MockNgToastService {}

describe('AddMovieComponent', () => {
  let component: AddMovieComponent;
  let fixture: ComponentFixture<AddMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [AddMovieComponent],
      providers: [
        { provide: UserService, useClass: MockUserService },
        { provide: MovieService, useClass: MockMovieService },
        { provide: NgToastService, useClass: MockNgToastService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddMovieComponent);
    component = fixture.componentInstance;
  });


  it('should initialize user and movies on ngOnInit', () => {
    component.ngOnInit();

    expect(component.user).toBe('Doe');
    expect(component.login).toBe('admin');
    expect(component.movies).toEqual([{ movieName: 'Test Movie' }]);
    expect(component.name).toBe('Test Movie');
  });

  it('should return the form control for image', () => {
    component.movie= new FormGroup({
     image:new FormControl('res.jpg'),
      movieName:new FormControl('test movie'),
      theatreName:new FormControl('test'),
      totalSeats:new FormControl(100),
      price:new FormControl(15),
      status:new FormControl("ava")
      })
    // expect(component.image).toBeTruthy();
    // expect(component.movieName).toBeTruthy();
    // expect(component.theatreName).toBeTruthy();
    // expect(component.totalTickets).toBeTruthy();
    // expect(component.price).toBeTruthy();
    // expect(component.status).toBeTruthy();


  });

  it('should submit the form and handle success', () => {
    component.movie= new FormGroup({
      image:new FormControl('res.png'),
      movieName:new FormControl('test movie'),
      theatreName:new FormControl('test'),
      totalSeats:new FormControl(100),
      price:new FormControl(15),
      status:new FormControl("book asap")
    })
      spyOn(component.movieService, 'createMovie').and.returnValue(of({ message: "movie added successfully" }));
      spyOn(Swal, 'fire');
  
      component.submit();
  
      expect(component.movieService.createMovie).toHaveBeenCalled();
    
    
  });

  it('should handle errors on submit', () => {
    spyOn(component.movieService, 'createMovie').and.returnValue(throwError({ error: 'Error' }));
  component.movie= new FormGroup({
  image:new FormControl('res.png'),
  movieName:new FormControl('test movie'),
  theatreName:new FormControl('test'),
  totalSeats:new FormControl(100),
  price:new FormControl(15),
  status:new FormControl("ava")
  })
    component.submit();

  });

  it('should reset the form', () => {
    component.movie= new FormGroup({
      image:new FormControl('res.png'),
      movieName:new FormControl('test movie'),
      theatreName:new FormControl('test'),
      totalSeats:new FormControl(100),
      price:new FormControl(15),
      status:new FormControl("ava")
      })
      component.onReset();
   
  });
});