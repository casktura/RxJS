import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule, MenubarModule, CardModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('RxJS');

  items: MenuItem[] = [
    {
      label: 'Simple',
      icon: 'pi pi-home',
      routerLink: '/',
    },
    {
      label: 'Advanced',
      icon: 'pi pi-lightbulb',
      routerLink: '/advanced',
    },
    {
      label: 'Page A',
      icon: 'pi pi-question',
      routerLink: '/page-a',
    },
    {
      label: 'Page B',
      icon: 'pi pi-question',
      routerLink: '/page-b',
    },
  ];
}
