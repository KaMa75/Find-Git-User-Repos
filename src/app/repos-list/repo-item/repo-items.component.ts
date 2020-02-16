import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-repo-items',
  templateUrl: './repo-items.component.html'
})
export class RepoItemsComponent implements OnInit {

  repos$: Observable<any> = this.dataService.getReposObs();

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

}
