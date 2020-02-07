import { TickerOptions } from './../interfaces/ticker-options';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.scss']
})
export class TickerComponent implements OnInit {
  @Input() options$: Observable<TickerOptions>;

  duration;
  interval;
  visible = true;

  constructor() { }

  ngOnInit() {
    this.options$.subscribe(opts => this.stopTimer(opts));
  }

  stopTimer(opts: TickerOptions) {
    if (this.duration) { clearTimeout(this.duration); }

    this.duration = setTimeout(() => {
      this.visible = false;
      this.startTimer(opts);
    }, opts.duration * 1000);
  }

  startTimer(opts: TickerOptions) {
    if (this.interval) { clearTimeout(this.interval); }

    this.interval = setTimeout(() => {
      this.visible = true;
      this.stopTimer(opts);
    }, opts.interval * 1000);
  }

}
