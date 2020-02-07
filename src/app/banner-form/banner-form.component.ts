import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-banner-form',
  templateUrl: './banner-form.component.html',
  styleUrls: ['./banner-form.component.scss']
})
export class BannerFormComponent implements OnInit {
  @Output() opt = new EventEmitter();

  form = this.fb.group({
    url: ['https://uploads.twitchalerts.com/image-defaults/1n9bK4w.gif', Validators.required],
    duration: [5],
    interval: [600],
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const opt = JSON.parse(localStorage.getItem('banner'));
    if (opt) {
      this.form.patchValue(opt);
    }

    this.form.valueChanges.subscribe(value => {
      this.opt.emit(value);
      localStorage.setItem('banner', JSON.stringify(value));
    });
    this.form.updateValueAndValidity();
  }

}
