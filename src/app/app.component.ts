import { Component, VERSION } from '@angular/core';
import { Observable } from 'rxjs';
import { Authenticationservice } from '../services';
import { User } from '../models';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  currentUser: User;
  constructor(private authenticationservice: Authenticationservice) {
    this.authenticationservice.currentUser.subscribe(
      (x) => (this.currentUser = x)
    );
  }
  time = new Observable<any>((observer) => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  
}
