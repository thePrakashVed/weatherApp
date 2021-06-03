import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FORCAST_TIME } from 'src/app/constants/constants';
import { CityTemperatureDetails } from 'src/app/models/CityTemperatureDetails';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  title: string;
  cityTemperatureDetailsList: Array<CityTemperatureDetails>;

  constructor(private router: ActivatedRoute, private apiService: ApiService) {
    this.cityTemperatureDetailsList = Array<CityTemperatureDetails>();
  }
/**
 * On load of this component calling the api and mapping it to Models
 * CityName is coming from Router.
 */
  ngOnInit(): void {
    let cityName: any;
    this.router.params.subscribe(params => {
      /* tslint:disable:no-string-literal */
      cityName = params['cityName'];
    });
    this.title = 'Next 5 days temperature and Sea level of city ' + cityName;
    this.getTemperatureofLast5Days(cityName);
  }

  /**
   * This methid is used to call and get the last 5 days Temperature data @9:00
   * After getting the Api response then filtering the data based on FORCAST_TIME
   * then storing it to model.
   * FORCAST_TIME time is nothing but forcast time as per the requirements.
   * @param cityName - is the city name for which temperature data is getting fetched
   */
  getTemperatureofLast5Days(cityName: string): void {
    this.apiService.getTemperatureDetails(cityName).subscribe((temperatureData: any) => {
      const temperatureListAtForcastTime = temperatureData.list.filter(item => item.dt_txt.includes(FORCAST_TIME));
      temperatureListAtForcastTime.map(tempData => {
        const cityTemperatureDetails = new CityTemperatureDetails();
        cityTemperatureDetails.date = tempData.dt_txt;
        cityTemperatureDetails.seaLevel = tempData.main.sea_level;
        cityTemperatureDetails.temperature = tempData.main.temp;
        this.cityTemperatureDetailsList.push(cityTemperatureDetails);
      });
    }, () => { // In Error Case .
      confirm('Please Try later.');
    });
  }
}
