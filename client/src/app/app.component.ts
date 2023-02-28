import { Component } from '@angular/core';
import { AuthenticateServiceService } from './authenticate-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Meal Mate';

  constructor(private authClient: AuthenticateServiceService) {}
}
