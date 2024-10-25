import { TestBed, ComponentFixture } from '@angular/core/testing';
import { MoviesComponent } from './movies.component';
import { MovieService } from '../movie.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { NgToastService } from 'ng-angular-popup';

// Mock MovieService
class MockMovieService {
  getMovies = jasmine.createSpy().and.returnValue(of({ getMovies: { movies: [{ name: 'Movie 1' }, { name: 'Movie 2' }] } }));
  deleteMovie = jasmine.createSpy().and.returnValue(of({ message: 'Movie deleted' }));
  updateStatus = jasmine.createSpy().and.returnValue(of({ message: 'BOOK ASAP' }));
}

// Mock UserService
class MockUserService {
  getCurrentUser = jasmine.createSpy().and.returnValue(of({ lastName: 'Doe' }));
  getLoginType = jasmine.createSpy().and.returnValue(of('user'));
  getUserLoginStatus = jasmine.createSpy().and.returnValue(of(true));
}

// Mock Router
class MockRouter {
  navigate = jasmine.createSpy();
}

// Mock NgToastService
class MockNgToastService {
  success = jasmine.createSpy();
}

describe('MoviesComponent', () => {
  it('should create the component', () => {
    const fixture = TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      providers: [
        { provide: MovieService, useClass: MockMovieService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter },
        { provide: NgToastService, useClass: MockNgToastService }
      ]
    }).createComponent(MoviesComponent);
    const component = fixture.componentInstance;
    
    expect(component).toBeTruthy();
  });

  it('should fetch movies on init', () => {
    const fixture = TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      providers: [
        { provide: MovieService, useClass: MockMovieService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter },
        { provide: NgToastService, useClass: MockNgToastService }
      ]
    }).createComponent(MoviesComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();  // Trigger ngOnInit

    expect(component.movieService.getMovies).toHaveBeenCalled();
    // expect(component.movies.length).toBe(2);  // Mocked movie data
  });

  it('should fetch current user on init', () => {
    const fixture = TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      providers: [
        { provide: MovieService, useClass: MockMovieService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter },
        { provide: NgToastService, useClass: MockNgToastService }
      ]
    }).createComponent(MoviesComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();  // Trigger ngOnInit

    expect(component.userService.getCurrentUser).toHaveBeenCalled();
    expect(component.user).toBe('Doe');
  });

  it('should fetch login type on init', () => {
    const fixture = TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      providers: [
        { provide: MovieService, useClass: MockMovieService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter },
        { provide: NgToastService, useClass: MockNgToastService }
      ]
    }).createComponent(MoviesComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();  // Trigger ngOnInit

    expect(component.userService.getLoginType).toHaveBeenCalled();
    expect(component.isUser).toBeTrue();
  });

  it('should fetch user login status on init', () => {
    const fixture = TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      providers: [
        { provide: MovieService, useClass: MockMovieService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter },
        { provide: NgToastService, useClass: MockNgToastService }
      ]
    }).createComponent(MoviesComponent);
    const component = fixture.componentInstance;

    fixture.detectChanges();  // Trigger ngOnInit

    expect(component.userService.getUserLoginStatus).toHaveBeenCalled();
    expect(component.status).toBeTrue();
  });

  it('should navigate to login when login is called', () => {
    const fixture = TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      providers: [
        { provide: MovieService, useClass: MockMovieService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter },
        { provide: NgToastService, useClass: MockNgToastService }
      ]
    }).createComponent(MoviesComponent);
    const component = fixture.componentInstance;

    component.login();
    expect(component.router.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should navigate to book ticket page', () => {
    const fixture = TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      providers: [
        { provide: MovieService, useClass: MockMovieService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter },
        { provide: NgToastService, useClass: MockNgToastService }
      ]
    }).createComponent(MoviesComponent);
    const component = fixture.componentInstance;

    const movieName = 'Movie 1';
    component.bookTicket(movieName);
    expect(component.router.navigate).toHaveBeenCalledWith([`/bookTicket/${movieName}`]);
  });

  it('should delete a movie', () => {
    const fixture = TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      providers: [
        { provide: MovieService, useClass: MockMovieService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter },
        { provide: NgToastService, useClass: MockNgToastService }
      ]
    }).createComponent(MoviesComponent);
    const component = fixture.componentInstance;

    component.deleteMovie('Movie 1');
    expect(component.movieService.deleteMovie).toHaveBeenCalledWith('Movie 1');
  });

  it('should open and close the form', () => {
    const fixture = TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      providers: [
        { provide: MovieService, useClass: MockMovieService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter },
        { provide: NgToastService, useClass: MockNgToastService }
      ]
    }).createComponent(MoviesComponent);
    const component = fixture.componentInstance;

    component.openForm('Movie 1');
    expect(component.isPopupOpen).toBeTrue();
    expect(component.movieName).toBe('Movie 1');

    component.closeForm();
    expect(component.isPopupOpen).toBeFalse();
  });

  it('should update movie status and handle "BOOK ASAP" message', () => {
    const fixture = TestBed.configureTestingModule({
      declarations: [MoviesComponent],
      providers: [
        { provide: MovieService, useClass: MockMovieService },
        { provide: UserService, useClass: MockUserService },
        { provide: Router, useClass: MockRouter },
        { provide: NgToastService, useClass: MockNgToastService }
      ]
    }).createComponent(MoviesComponent);
    const component = fixture.componentInstance;

    component.update();
    expect(component.movieService.updateStatus).toHaveBeenCalledWith(component.movieName, component.numberOfTickets);
  });
});