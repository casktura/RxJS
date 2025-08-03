import { Component, inject, OnInit } from '@angular/core';
import { LogViewerComponent } from '../log-viewer/log-viewer';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../api-service';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { filter, map } from 'rxjs';
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
  resultB$ = this.resultA$.pipe(map((valueA) => valueA / 2));

  ngOnInit(): void {
    this.controlA.valueChanges.subscribe((value) => {
      this.logs.push(`New value: ${value}`);
    });
  }

  showApiResult() {
    this.randomApiResponse.subscribe((response) => {
      this.logs.push(`API result: ${response.result}`);
    });
  }
}
