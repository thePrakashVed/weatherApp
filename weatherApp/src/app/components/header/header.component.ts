import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DEFAULT_APP_TITLE } from 'src/app/constants/constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // Title is coming form parent component, Default data is hardcoded.
  @Input() title = DEFAULT_APP_TITLE;
  // isBackBtnRequired is nothing but back button is required or not default is false
  @Input() isBackBtnRequired = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  /**
   * Method is to redirect to next page.
   */
  goToHome(): void {
    this.router.navigate(['/home']);
  }
}
