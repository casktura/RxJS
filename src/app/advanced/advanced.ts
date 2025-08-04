import { Component, inject, OnInit } from '@angular/core';
import { LogViewerComponent } from '../log-viewer/log-viewer';
import { ButtonModule } from 'primeng/button';
import { ApiService } from '../api-service';
import {
  concatMap,
  debounceTime,
  map,
  mergeMap,
  Subject,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-advanced',
  imports: [LogViewerComponent, ButtonModule],
  templateUrl: './advanced.html',
  styleUrl: './advanced.scss',
})
export class AdvancedComponent implements OnInit {
  logs: string[] = [];
  api = inject(ApiService);

  times = [5, 3, 1];
  mergeMapIndex = 0;
  concatMapIndex = 0;
  switchMapIndex = 0;
  mergeMapTrigger = new Subject<void>();
  concatMapTrigger = new Subject<void>();
  switchMapTrigger = new Subject<void>();

  ngOnInit(): void {
    this.mergeMapTrigger
      .asObservable()
      .pipe(
        mergeMap(() => {
          const time = this.times[this.mergeMapIndex];
          this.mergeMapIndex++;

          if (this.mergeMapIndex >= 3) {
            this.mergeMapIndex = 0;
          }

          return this.api.getWait(time);
        }),
      )
      .subscribe((response) => {
        this.logs.push(`Merge map result: ${response.result}`);
      });
    this.concatMapTrigger
      .asObservable()
      .pipe(
        map(() => {
          const time = this.times[this.concatMapIndex];
          this.concatMapIndex++;

          if (this.concatMapIndex >= 3) {
            this.concatMapIndex = 0;
          }

          return time;
        }),
        concatMap((time) => {
          return this.api.getWait(time);
        }),
      )
      .subscribe((response) => {
        this.logs.push(`Concat map result: ${response.result}`);
      });
    this.switchMapTrigger
      .asObservable()
      .pipe(
        switchMap(() => {
          const time = this.times[this.switchMapIndex];
          this.switchMapIndex++;

          if (this.switchMapIndex >= 3) {
            this.switchMapIndex = 0;
          }

          return this.api.getWait(time);
        }),
      )
      .subscribe((response) => {
        this.logs.push(`Switch map result: ${response.result}`);
      });
  }
}
