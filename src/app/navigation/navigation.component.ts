import { Component, OnInit } from '@angular/core';
import { NgbDropdown, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { SigninFormComponent } from '../signin-form/signin-form.component'
import { User } from '../models/user.model';
import { GalleryCategory } from '../models/galleryCategory.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {
  user: User;

  constructor(
    private modalService: NgbModal,
    private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.user = this.auth.currentUser;
  }

  signIn() {
    const modalRef = this.modalService.open(SigninFormComponent);
    modalRef.result.then(() => location.reload());
  }

  signOut() {
    this.auth.logout();
    location.reload();
  }

  toggleMenu(e: any, target: NgbDropdown) {
    e.stopPropagation();
    target.toggle();
  }
}