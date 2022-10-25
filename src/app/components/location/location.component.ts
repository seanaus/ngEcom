import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/services/settings.service';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  settings: any;

  constructor(private settingsService: SettingsService) { }

  async ngOnInit() {
    ///////// GET SETTINGS ////////
    const settings$ = await this.settingsService.getSettings("location");
    settings$.subscribe((settings: any) => {
      this.settings = settings;
    })
  }

}
