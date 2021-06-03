import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CityTemperature } from 'src/app/models/cityTemperature';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cityTemperatureList: Array<CityTemperature>;

  constructor(private apiService: ApiService, private router: Router, private commonService: CommonService) {
    this.cityTemperatureList = Array<CityTemperature>();
  }

  /**
   * On load of this component calling the temperature Api for 5 EUROPEAN_CITIES_LIST and mapping data to model.
   */
  ngOnInit(): void {
    this.apiService.getCityListTemperature().subscribe((response: any) => {
      response.map((data: any) => {
        const cityTemperature = new CityTemperature();
        cityTemperature.cityName = data.name;
        cityTemperature.sunriseTime = data.sys.sunrise;
        cityTemperature.sunsetTime = data.sys.sunset;
        cityTemperature.temperature = data.main.temp;
        this.cityTemperatureList.push(cityTemperature);
      });

    }, () => { // Error case.
      confirm('Please Try later.');
    });
  }

  /**
   * This method will call the service and return the Time.
   * @param time in timeStamp
   * @returns the time in AM or PM
   */
  formatTime(time: any): any {
    return this.commonService.getExactTimeFromUnix(time);
  }

  /**
   * Route to details page.
   * @param cityName - Name of the city
   */
  goToDetails(cityName: string): void {
    this.router.navigate(['/details/', cityName]);
  }
}
