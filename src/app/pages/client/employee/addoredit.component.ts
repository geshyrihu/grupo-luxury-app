import { EBoolean } from '../../../shared/enums/EBoolean';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { EArea } from '../../../shared/enums/EArea';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ETypeContract } from '../../../shared/enums/ETypeContract';
import { EEducationLevel } from '../../../shared/enums/EEducationLevel';
import { ECountry } from '../../../shared/enums/ECountry';
import { EMaritalStatus } from '../../../shared/enums/EMaritalStatus';
import { EBloodType } from '../../../shared/enums/EBloodType';
import { DateService } from 'src/app/shared/services/date.service';
import { ESex } from '../../../shared/enums/ESex';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService } from 'src/app/shared/services/data.service';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
import { EmployeeAddOrEditDto } from './interfaces/EmployeeAddOrEditDto';

@Component({
  selector: 'app-addoredit',
  templateUrl: './addoredit.component.html',
  providers: [DatePipe],
})
export class AddoreditEmplopyeeComponent implements OnInit {
  isInRole: boolean;
  id = 0;
  customerId = 0;
  cb_Sex = ESex.GetEnum();
  cb_BloodType = EBloodType.GetEnum();
  cb_MaritalStatus = EMaritalStatus.GetEnum();
  cb_Nationality = ECountry.GetEnum();
  cb_EducationLevel = EEducationLevel.GetEnum();
  cb_TypeContract = ETypeContract.GetEnum();
  cb_Area = EArea.GetEnum();
  cb_Profession: any[] = [];
  cb_Boolean = [
    { value: true, label: 'Activo' },
    { value: false, label: 'Inactivo' },
  ];
  model: EmployeeAddOrEditDto;
  urlBaseImg = '';
  photoFileUpdate: boolean = false;

  form: FormGroup;

  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private dateService: DateService,
    private authService: AuthService,
    private selectListService: SelectlistService,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    public datepipe: DatePipe
  ) {
    this.isInRole = this.authService.validationRole('SuperUsuario');
    this.customerId = authService.customerAuthId;
    this.urlBaseImg = `${environment.base_urlImg}customers/${this.customerId}/employee/`;
    selectListService.getProfessions().subscribe((resp) => {
      this.cb_Profession = resp;
    });
  }

  ngOnInit(): void {
    this.id = this.config.data.id;
    if (this.id !== 0) {
      this.onLoadData();
    }
    this.form = this.formBuilder.group({
      id: { value: this.id, disabled: true },
      active: [true],
      address: ['', Validators.required],
      area: ['', Validators.required],
      birth: ['', [Validators.required]],
      bloodType: ['', Validators.required],
      cellPhone: [''],
      curp: ['', Validators.required],
      customerId: [this.customerId],
      dateAdmission: ['', [Validators.required]],
      dateCreation: [this.dateService.getDateNow()],
      educationLevel: ['', Validators.required],
      lastName: ['', Validators.required],
      localPhone: [''],
      maritalStatus: ['', Validators.required],
      name: ['', Validators.required],
      nationality: ['', Validators.required],
      nss: ['', Validators.required],
      photoPath: [''],
      professionId: ['', Validators.required],
      rfc: [0, Validators.required],
      salary: ['', Validators.required],
      sex: ['', Validators.required],
      typeContract: ['', Validators.required],
      user: [''],
    });
  }

  submit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((x) => {
        x.markAllAsTouched();
      });
      return;
    }
    const formData = this.createFormData(this.form.value);
    if (this.id === 0) {
      this.dataService.post('Employees', formData).subscribe(
        (resp) => {
          this.ref.close('Empleado creado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    } else {
      this.dataService.put(`Employees/${this.id}`, formData).subscribe(
        (resp) => {
          this.ref.close('Empleado Actualizado');
        },
        (err) => {
          console.log(err.error);
        }
      );
    }
  }
  onLoadData() {
    this.dataService.get(`Employees/${this.id}`).subscribe((resp: any) => {
      this.model = resp.body;
      this.model.birth = this.datepipe.transform(
        this.model.birth,
        'yyyy-MM-dd'
      );
      this.model.dateAdmission = this.datepipe.transform(
        this.model.dateAdmission,
        'yyyy-MM-dd'
      );
      this.form.patchValue(this.model);
    });
  }
  get active() {
    return this.form.get('active');
  }
  get address() {
    return this.form.get('address');
  }
  get area() {
    return this.form.get('area');
  }
  get birth() {
    return this.form.get('birth');
  }
  get bloodType() {
    return this.form.get('bloodType');
  }
  get cellPhone() {
    return this.form.get('cellPhone');
  }
  get curp() {
    return this.form.get('curp');
  }
  get dateAdmission() {
    return this.form.get('dateAdmission');
  }
  get educationLevel() {
    return this.form.get('educationLevel');
  }
  get lastName() {
    return this.form.get('lastName');
  }
  get localPhone() {
    return this.form.get('localPhone');
  }
  get maritalStatus() {
    return this.form.get('maritalStatus');
  }
  get name() {
    return this.form.get('name');
  }
  get nationality() {
    return this.form.get('nationality');
  }
  get nss() {
    return this.form.get('nss');
  }
  get professionId() {
    return this.form.get('professionId');
  }
  get rfc() {
    return this.form.get('rfc');
  }
  get salary() {
    return this.form.get('salary');
  }
  get sex() {
    return this.form.get('sex');
  }
  get typeContract() {
    return this.form.get('typeContract');
  }

  private createFormData(model: any): FormData {
    const formData = new FormData();

    formData.append('active', model.active);
    formData.append('address', model.address);
    formData.append('area', model.area);
    formData.append('birth', model.birth);
    formData.append('bloodType', model.bloodType);
    formData.append('cellPhone', model.cellPhone);
    formData.append('curp', model.curp);
    formData.append('customerId', model.customerId);
    formData.append('dateAdmission', model.dateAdmission);
    formData.append('dateCreation', model.dateCreation);
    formData.append('educationLevel', model.educationLevel);
    formData.append('lastName', model.lastName);
    formData.append('localPhone', model.localPhone);
    formData.append('maritalStatus', model.maritalStatus);
    formData.append('name', model.name);
    formData.append('nationality', model.nationality);
    formData.append('nss', model.nss);
    formData.append('professionId', model.professionId);
    formData.append('rfc', model.rfc);
    formData.append('salary', model.salary);
    formData.append('sex', model.sex);
    formData.append('typeContract', model.typeContract);
    formData.append('user', model.user);
    if (model.photoPath) {
      formData.append('photoPath', model.photoPath);
    }

    return formData;
  }

  // ...Recibiendo archivo emitido
  uploadFile(file: File) {
    this.photoFileUpdate = true;
    this.form.patchValue({ photoPath: file });
  }
}
