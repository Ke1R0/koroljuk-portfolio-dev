import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';
import { User } from '../models/user.model';

export enum AccessLevel {
  Read = 1,
  Add = 2,
  Edit = 4,
  Delete = 8,
  Full = 15
}

export interface AccessRights {
  sectionName: string;
  accessLevel: AccessLevel;
}

@Injectable()
export class AccessRightsService {

  constructor(private auth: AuthenticationService, private http: Http) {
  }

  getRights(sectionName: string): Observable<AccessRights> {
    const user = this.auth.currentUser;
    const options = new RequestOptions({ headers: this.auth.Headers });
    return this.http.get(`/api/access-rights/${sectionName}/${user._id}`, options)
      .map(res => {
        const json = res.json();
        return json.accessRights;
      }, err => err);
  }

  hasDeleteRights(rights: AccessRights): boolean {
    return !!(rights.accessLevel & AccessLevel.Delete);
  }

  hasEditRights(rights: AccessRights): boolean {
    return !!(rights.accessLevel & AccessLevel.Edit);
  }

  hasAddRights(rights: AccessRights): boolean {
    return !!(rights.accessLevel & AccessLevel.Add);
  }
}