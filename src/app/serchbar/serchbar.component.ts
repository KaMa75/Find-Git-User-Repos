import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-serchbar',
  templateUrl: './serchbar.component.html'
})
export class SerchbarComponent implements OnInit {

  settings$: Observable<any> = this.dataService.getSettingsObs();

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  getRepos(form): void {
    this.dataService.getRepos(form.value.userName);
    form.reset();
  }

}
