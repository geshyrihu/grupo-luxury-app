import { DataService } from '../../../shared/services/data.service';
import { ERelationEmployee } from '../../../shared/enums/ERelationEmployee';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-employee',
  templateUrl: './contact-employee.component.html',
  providers: [MessageService, ConfirmationService],
})
export class ContactEmployeeComponent implements OnInit {
  id: number;
  idEmployee: number;
  cb_contactEmployee: any[] = ERelationEmployee.GetEnum();
  showButtonAddOrCancel: boolean = false;
  contactEmployeeAdd: any;

  data: any[] = [];
  form: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private dataService: DataService,
    public messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.idEmployee = this.config.data.id;
    this.onLoadForm();

    this.getContactEmployees();
  }

  onLoadForm() {
    this.form = this.formbuilder.group({
      id: { value: this.id, disabled: true },
      name: ['', Validators.required],
      relacion: ['', Validators.required],
      phoneOne: ['', Validators.required],
      phoneTwo: [''],
      employeeId: [this.idEmployee, Validators.required],
    });
  }

  get name() {
    return this.form.get('name');
  }
  get relacion() {
    return this.form.get('relacion');
  }
  get phoneOne() {
    return this.form.get('phoneOne');
  }

  getContactEmployees() {
    this.dataService
      .get(`ContactEmployees/GetAsyncAll/${this.idEmployee}`)
      .subscribe((resp: any) => {
        this.data = resp.body;
      });
  }

  onUpdate(item: any) {
    this.dataService
      .put(`ContactEmployees/${item.id}`, item)
      .subscribe((resp: any) => {
        this.showToast('success', 'Completado!!', 'Actualizado');
        this.getContactEmployees();
      });
  }
  onDelete(item: any) {
    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando solicitud...',
    });
    Swal.showLoading();
    this.dataService.delete(`ContactEmployees/${item.id}`).subscribe(
      (resp) => {
        this.showToast('info', 'Info', 'Registro borrado!');
        Swal.close();
        this.getContactEmployees();
      },
      (err) => {
        this.showToast('error', 'Error', 'Error al itentar actualizar');
        Swal.close();
        console.log(err.error);
      }
    );
  }
  onSubmit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    } else {
      this.dataService.post(`ContactEmployees`, this.form.value).subscribe(
        (resp) => {
          this.showToast('success', 'Completado!!', 'Creado');
          this.showButtonAddOrCancel = false;
          this.getContactEmployees();
          this.onLoadForm();
        },
        (err) => {
          this.showToast('error', 'Error', 'Error al itentar crear');
          console.log(err.error);
        }
      );
    }
  }

  showToast(severity: string, summary: string, detail: string) {
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}
