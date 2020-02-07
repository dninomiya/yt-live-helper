import { environment } from './../environments/environment';
import { TickerOptions } from './interfaces/ticker-options';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar, MatTabChangeEvent } from '@angular/material';
import { Observable, ReplaySubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  domain = environment.production ? 'https://deerboy.github.io/yt-live-helper' : `http://localhost:${location.port}`;
  type: 'ticker' | 'banner' = 'ticker';
  options = {};

  optionSource = new ReplaySubject<TickerOptions>();
  option$ = this.optionSource.asObservable();
  mode = 'editor';

  resultURL: string;

  constructor(
    private snack: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.route.queryParamMap.subscribe(map => {
      const result: any = {};
      map.keys.forEach(key => {
        result[key] = map.get(key);
      });

      if (result.type) {
        this.type = result.type;

        if (this.type === 'ticker') {
          result.tickers = result.tickers.split(',');
        }

        this.setOptions(result, result.type);
        this.mode = 'view';
      }
    });
  }

  openAlert() {
    this.snack.open('コピーしました', null, {
      duration: 2000
    });
  }

  changeType(event: MatTabChangeEvent) {
    this.type = event.index ? 'banner' : 'ticker';
    this.resultURL = null;
    this.updateOption(this.type);
  }

  setOptions(options, type: string) {
    this.options[type] = options;
    this.updateOption(this.type);
  }

  updateOption(type: string) {
    const options = this.options[type];
    const params = [];

    Object.keys(options).forEach(key => {
      params.push(key + '=' + encodeURIComponent(options[key]));
    });
    params.push(`type=${this.type}`);

    this.optionSource.next(options);
    this.resultURL = this.domain + '?' + params.join('&');
  }
}
