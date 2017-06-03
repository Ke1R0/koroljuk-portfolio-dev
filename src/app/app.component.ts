import { Component } from '@angular/core';
import { NavigationComponent } from './navigation/navigation.component'
import { FooterComponent } from './footer/footer.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [NavigationComponent, FooterComponent]
})
export class AppComponent {
}
