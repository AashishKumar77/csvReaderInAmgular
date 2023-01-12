import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { map } from 'rxjs/operators';
@Injectable({ 
  providedIn: 'root'
})
export class ContentserviceService {

  constructor(private http: HttpClient) { }
httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  generateDoc(body: any) {   
    return this.http.post<any>('BASE_URL', body).pipe(map((user:any) => {
      return user;
    }))
  }

}
