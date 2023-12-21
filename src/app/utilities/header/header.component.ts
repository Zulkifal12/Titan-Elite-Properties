import { Component } from '@angular/core';
import { fromEvent } from 'rxjs';
import { LoaderService } from 'src/app/interceptor/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isConnected = false;
  constructor(public loaderService: LoaderService) {
    fromEvent(window, 'online').subscribe(() => {
      this.isConnected = false;
    });

    fromEvent(window, 'offline').subscribe(() => {
      this.isConnected = true;
    });
  }
}
