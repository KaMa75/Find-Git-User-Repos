import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-repos-list',
  templateUrl: './repos-list.component.html'
})
export class ReposListComponent implements OnInit {

  settings$: Observable<any> = this.dataService.getSettingsObs();
  message$: Observable<any> = this.dataService.getMessageObs();

  constructor(private dataService: DataService) { }

  ngOnInit() { }

}
