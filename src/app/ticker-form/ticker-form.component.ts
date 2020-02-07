import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ticker-form',
  templateUrl: './ticker-form.component.html',
  styleUrls: ['./ticker-form.component.scss']
})
export class TickerFormComponent implements OnInit {
  @Output() opt = new EventEmitter();

  form = this.fb.group({
    tickers: ['チャンネル登録よろしく', [Validators.required]],
    background: ['#000000'],
    color: ['#ffffff'],
    duration: [30],
    speed: [5],
    interval: [10],
  });

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.form.valueChanges.subscribe(value => {
      const data = Object.assign({}, value);
      data.tickers = data.tickers.split('\n');
      this.opt.emit(data);
    });
    this.form.updateValueAndValidity();
  }

}
