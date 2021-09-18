import { Component } from '@angular/core';
import { SidebarService } from '../shared/services/sidebar.service';
import { SignalrcustomService } from './../shared/services/signalrcustom.service';
// imoprtaciones de AdminLte
import * as $ from 'jquery';
import * as AdminLte from 'admin-lte';

// imoprtaciones de AdminLte

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
})
export class PagesComponent {
  year = new Date().getFullYear();
  // display;
  items: any[] = [];

  constructor(
    private sidebarService: SidebarService,
    private signalrcustomService: SignalrcustomService
  ) {
    this.items = sidebarService.menu;
  }
}
