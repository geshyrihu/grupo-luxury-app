import { DateService } from 'src/app/shared/services/date.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-filter',
  templateUrl: './form-filter.component.html',
})
export class FormFilterComponent implements OnInit {
  dateAfter = this.dateService.getDateNow30();

  form: FormGroup;

  @Output()
  OnSubmit = new EventEmitter<any>();
  constructor(
    private formBuilder: FormBuilder,
    private dateService: DateService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      dateStart: [new Date(this.dateAfter), Validators.required],
      dateEnd: [new Date(), Validators.required],
    });
  }
  onSubmit() {
    return this.OnSubmit.emit(this.form.value);
  }
}
