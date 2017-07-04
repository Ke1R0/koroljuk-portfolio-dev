import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from '../models/user.model'
import { Credentials } from '../models/credentials.model'
import { AuthenticationService } from '../services/authentication.service'

@Component({
  selector: 'app-signin-form',
  templateUrl: './signin-form.component.html',
  styleUrls: ['./signin-form.component.css']
})
export class SigninFormComponent {
  error: any;
  credentials: Credentials;

  constructor(public modalInstance: NgbActiveModal, private authenticationService: AuthenticationService) {
    this.credentials = new Credentials();
  }

  signIn() {
    this.error = null;
    this.authenticationService.login(this.credentials)
      .subscribe(
        () => this.modalInstance.close(),
        err => {
          this.error = err.message;
        }
      );
  }

  dismiss() {
    this.modalInstance.dismiss();
  }
}
