import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService implements InMemoryDbService {

  constructor() { }
  createDb(): {} | Observable<{}> | Promise<{}> {
    return {
      users: [
        
      ],
      groups: [
        
      ],
      expenses: [
        
      ],
      groupMembers: [
        
      ]
    }
  }
}
