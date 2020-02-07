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
    tickers: ['チャンネル登録と高評価お願いします😀\n気軽に質問してください💬', [Validators.required]],
    background: ['#000000'],
    color: ['#ffffff'],
    duration: [30],
    speed: [30],
    interval: [600],
  });

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    const opt = JSON.parse(localStorage.getItem('ticker'));
    if (opt && opt.tickers) {
      this.form.patchValue({
        ...opt,
        tickers: opt.tickers.join('\n')
      });
    }

    this.form.valueChanges.subscribe(value => {
      const data = Object.assign({}, value);
      data.tickers = data.tickers.split('\n');
      this.opt.emit(data);
      localStorage.setItem('ticker', JSON.stringify(data));
    });
    this.form.updateValueAndValidity();
  }

}
