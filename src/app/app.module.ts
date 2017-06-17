import { BrowserModule } from '@angular/platform-browser';
import { NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { IgCommonModule } from './modules/ig-common/ig-common.module';
import { GalleryModule } from './modules/gallery/gallery.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryService } from './services/category.service';
import { CategoryProxyService } from './services/category-proxy.service';
import { AuthenticationService } from './services/authentication.service'
import { AccessRightsService } from './services/access-rights.service';
import { SigninFormComponent } from './signin-form/signin-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    NavigationComponent,
    FooterComponent,
    SigninFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    GalleryModule,
    IgCommonModule,
    AppRoutingModule,
    NgbModule.forRoot()
  ],
  entryComponents: [ SigninFormComponent ],
  providers: [CategoryService, AuthenticationService, CategoryProxyService, AccessRightsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
