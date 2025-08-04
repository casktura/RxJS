import { Component, inject, OnInit } from '@angular/core';
import { LogViewerComponent } from '../log-viewer/log-viewer';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../api-service';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import {
  combineLatestWith,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  startWith,
} from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advanced',
  imports: [
    LogViewerComponent,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './simple.html',
  styleUrl: './simple.scss',
})
export class SimpleComponent implements OnInit {
  api = inject(ApiService);
  fb = inject(FormBuilder);
  logs: string[] = [];

  controlA = new FormControl<string>('');
  controlB = new FormControl<string>('');
  randomApiResponse = this.api.getRandom();

  resultA$ = this.controlA.valueChanges.pipe(
    filter((value) => !!value && !isNaN(Number(value))),
    map((value) => Number(value) + 10),
  );
  resultB$ = this.resultA$.pipe(
    combineLatestWith(
      this.controlB.valueChanges.pipe(
        startWith(0),
        filter((value) => !!value && !isNaN(Number(value))),
        map((value) => Number(value)),
      ),
    ),
    map(([valueA, inputB]) => valueA / 2 + inputB),
  );

  ngOnInit(): void {
    this.controlA.valueChanges
      .pipe(
        debounceTime(500),
        filter((value) => value !== 'A'),
      )
      .subscribe((value) => {
        this.display(`New value: ${value}`);
      });
    this.playground();
  }

  showApiResult() {
    this.randomApiResponse.subscribe((response) => {
      this.display(`API result: ${response.result}`);
    });
  }

  display(message: string) {
    this.logs.push(message);
  }

  playground() {}
}
