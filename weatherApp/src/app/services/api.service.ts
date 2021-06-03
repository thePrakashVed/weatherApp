import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EUROPEAN_CITIES_LIST } from '../constants/constants';
import { forkJoin } from 'rxjs';
import { Keys } from '../constants/keys';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  cityList = EUROPEAN_CITIES_LIST;
  constructor(private http: HttpClient) { }

  /**
   * This method is used to call Api and get the temperature data of the perticular city.
   * Api docs - https://openweathermap.org/api
   * This method will call the list of APi and then it will do fork Join.
   * @returns will be an Observable, Temperature of the above city
   */
  getCityListTemperature(): Observable<any[]> {
    const multiPuts = [];
    this.cityList.forEach(item => {
      multiPuts.push(this.getCityTemperature(item.cityName));
    });
    return new Observable(observer => {
      forkJoin(multiPuts)
        .subscribe(
          (response: any) => {
            observer.next(response);
            observer.complete();
          },
          error => {
            observer.error(error);
            observer.complete();
          }
        );
    });
  }

  /**
   * get Temperature list of a city
   * @param cityName is name of city which u want to get the temperature list.
   * @returns Observable as temperature data.
   */
  getCityTemperature(cityName: string): Observable<any> {
    const apiUrl = environment.Base_URL + Keys.weather;
    const params = {
      q: cityName,
      appid: environment.API_KEY
    };
    return new Observable(observer => {
      this.http
        .get(apiUrl, { params })
        .subscribe(
          (response: any) => {
            observer.next(response);
            observer.complete();
          },
          error => {
            observer.error(error);
            observer.complete();
          }
        );
    });
  }

  /**
   * last 5 days Temperature details of a perticular city.
   * @param cityName Name of the city.
   * @returns Temperature data.
   */
  getTemperatureDetails(cityName: string): Observable<any> {
    const apiUrl = environment.Base_URL + Keys.forecast;
    const params = {
      q: cityName,
      appid: environment.API_KEY
    };
    return new Observable(observer => {
      this.http
        .get(apiUrl, { params })
        .subscribe(
          (response: any) => {
            observer.next(response);
            observer.complete();
          },
          error => {
            observer.error(error);
            observer.complete();
          }
        );
    });
  }
}
