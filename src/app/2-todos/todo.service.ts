import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

@Injectable()
export class TodoService { 
  constructor(private http: HttpClient) { 
  }
 
  add(todo: { title: string; }) {
    return this.http.post('...', todo).pipe(map(r=>{ JSON.stringify(r)}))
  }

  getTodos() { 
    return this.http.get('...')
    //return this.http.get('...').pipe(map(r=>{ JSON.stringify(r)}))
  }

  // not converting it to json check it once
  getTodosPromise() {
    return this.http.get('...').toPromise();
  }

  delete(id:any) {
    return this.http.delete('...').pipe(map(r=>{ JSON.stringify(r)}))
  }
}