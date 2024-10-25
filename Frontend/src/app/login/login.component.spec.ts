import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import {HttpClientModule} from '@angular/common/http';
 import { UserService } from '../user.service';


describe('myService', () => {

      beforeEach(() => TestBed.configureTestingModule({
        imports: [HttpClientTestingModule], 
        providers: [UserService]
      }));

       it('should be user creation data', () => {
        const service: UserService = TestBed.get(UserService);
        expect(service).toBeTruthy();
       });

       it('should have  user data ', () => {
        const service: UserService = TestBed.get(UserService);
      
       });

    });