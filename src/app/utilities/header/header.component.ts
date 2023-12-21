import { Component } from '@angular/core';
import { LoaderService } from 'src/app/interceptor/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(public loaderService: LoaderService) {}
}
