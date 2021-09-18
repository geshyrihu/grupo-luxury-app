import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html'
})
export class EquipmentComponent implements OnInit {

  videoUrl = 'https://www.youtube.com/embed/jxVZm4OPv8A';

  constructor() { }

  ngOnInit (): void {
  }

}
