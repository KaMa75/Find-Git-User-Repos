import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpService } from './http.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private reposListSettings = {
    firstOpen: {
      showList: false,
      loading: false,
      showMessage: false
    },
    loading: {
      showList: false,
      loading: true,
      showMessage: false
    },
    isLoaded: {
      showList: true,
      loading: false,
      showMessage: false
    },
    showMessage: {
      showList: false,
      loading: false,
      showMessage: true
    }
  };
  private messages = {
    none: {
      msg: '',
      type: ''
    },
    noRepos: {
      msg: `Wyszukiwany użytkownik nie posiada żadnego repozytorium.`,
      type: 'info'
    },
    noUser: {
      msg: `Wyszukiwany użytkownik nie istnieje.`,
      type: 'info'
    },
    error: {
      msg: `Wystąpił błąd.`,
      type: 'error'
    }
  };
  private userRepos = [];

  private userReposObs = new BehaviorSubject<any>(this.userRepos);
  private settingsObs = new BehaviorSubject<any>(this.reposListSettings.firstOpen);
  private messageObs = new BehaviorSubject<any>(this.messages.none);

  constructor( private http: HttpService ) { }

  getReposObs(): Observable<any> {
    return this.userReposObs.asObservable();
  }

  getSettingsObs(): Observable<any> {
    return this.settingsObs.asObservable();
  }

  getMessageObs(): Observable<any> {
    return this.messageObs.asObservable();
  }

  getRepos(user: string) {
    this.settingsObs.next(this.reposListSettings.loading);
    this.http.getRepos(user).subscribe(
      (response) => {
        if (response.length > 0) {
          this.userReposObs.next(response);
          this.settingsObs.next(this.reposListSettings.isLoaded);
        } else {
          this.messageObs.next(this.messages.noRepos);
          this.settingsObs.next(this.reposListSettings.showMessage);
        }
      },
      (errorResponse: HttpErrorResponse) => {
        if (errorResponse.error.message === 'Not Found') {
          this.messageObs.next(this.messages.noUser);
        } else {
          this.messageObs.next(this.messages.error);
        }
        this.settingsObs.next(this.reposListSettings.showMessage);
      }
    );
  }

}
