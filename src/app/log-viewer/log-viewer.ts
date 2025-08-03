import { Component, model } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-log-viewer',
  imports: [ButtonModule, TableModule],
  templateUrl: './log-viewer.html',
  styleUrl: './log-viewer.scss',
})
export class LogViewerComponent {
  logs = model<string[]>([]);

  clear() {
    this.logs.update(() => []);
  }
}
