import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-create-report',
  templateUrl: './button-create-report.component.html',
})
export class ButtonCreateReportComponent {
  @Output()
  OnSubmit = new EventEmitter();

  onSubmit() {
    return this.OnSubmit.emit();
  }
}
