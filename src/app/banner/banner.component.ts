import { BannerOptions } from './../interfaces/banner-options';
import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() options$: Observable<BannerOptions>;
  duration;
  interval;
  visible = true;

  constructor(
  ) { }

  ngOnInit() {
    this.options$.subscribe(opt => {
      this.visible = true;
      this.stopTimer(opt);
    });
  }

  stopTimer(opts: BannerOptions) {
    if (this.duration) { clearTimeout(this.duration); }

    this.duration = setTimeout(() => {
      this.visible = false;
      this.startTimer(opts);
    }, opts.duration * 1000);
  }

  startTimer(opts: BannerOptions) {
    if (this.interval) { clearTimeout(this.interval); }

    this.interval = setTimeout(() => {
      this.visible = true;
      this.stopTimer(opts);
    }, opts.interval * 1000);
  }

}
