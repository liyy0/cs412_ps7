import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { CacheService } from './cache.service';
import { Observable, map } from 'rxjs';
import { of,tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  data:any;
  CACHE_KEY = 'httpCache';

  constructor(private http:HttpClient) { }

  public dataRetrievedFromCache: boolean = false;


  // getData(){
  //   let url = 'http://localhost:8080';
  //   this.data = this.http.get<any>(url)
  //     .pipe(
  //       map(data => data.products)
  //     );


  //   return this.data;

  // }

  getData(geo:any): Observable<{data: any, fromCache: boolean}> {
    const cacheKey = `my-data-cache${geo}`;
    const cachedData = localStorage.getItem(geo);

    if (cachedData) {
        console.log('Data retrieved from cache.');
        return of({data: JSON.parse(cachedData), fromCache: true});
    } else {
        let url = 'http://localhost:8080';

        return this.http.post<any>(url,{geovalue:geo}).pipe(
            tap(data => {
                localStorage.setItem(geo, JSON.stringify(data));
                console.log('Data retrieved from server and cached.');
            }),
            map(data => ({data, fromCache: false}))
        );
    }
    // localStorage.clear();
}}
