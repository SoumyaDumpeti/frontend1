import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AddMovieComponent } from './add-movie/add-movie.component';
import { BookTicketComponent } from './book-ticket/book-ticket.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { MoviesComponent } from './movies/movies.component';

import { FooterComponent } from './footer/footer.component';





@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    AddMovieComponent,
    BookTicketComponent,
    HeaderComponent,
    MoviesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  
  ],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent]
})
export class AppModule { }
