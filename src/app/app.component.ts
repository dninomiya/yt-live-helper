import { TickerOptions } from './interfaces/ticker-options';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  domain = 'https://deerboy.github.io/yt-live-helper/';
  type: 'ticker' | 'banner' = 'ticker';
  tickerOptionSource = new ReplaySubject<TickerOptions>();
  tickerOption$: Observable<TickerOptions> = this.tickerOptionSource.asObservable();

  tickerControl = new FormControl();
  bannerControl = new FormControl();

  constructor(
    private snack: MatSnackBar
  ) { }

  get tickerURL(): string {
    const value = this.tickerControl.value;
    if (this.tickerControl.value) {
      return this.domain + '?type=ticker&duration=1000&text=' + value.replace(/\n/gm, ',');
    } else {
      return null;
    }
  }

  openAlert() {
    this.snack.open('コピーしました', null, {
      duration: 2000
    });
  }

  changeType(event: MatTabChangeEvent) {
    this.type = event.index ? 'ticker' : 'banner';
  }

  updateOption(options) {
    this.tickerOptionSource.next(options);
  }
}
