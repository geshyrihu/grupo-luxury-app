import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EPriority } from 'src/app/shared/enums/EPriority';
import { EStatus } from 'src/app/shared/enums/EStatus';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PanelDto } from '../../../models/operationReport/panelDto';
import { SelectlistService } from 'src/app/shared/services/selectlist.service';
import { DataService } from 'src/app/shared/services/data.service';
import { FilterReportOperationService } from 'src/app/shared/services/filter-report-operation.service';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
})
export class PanelComponent implements OnInit {
  panelDto = new PanelDto();
  cb_status = EStatus.GetEnum();
  cb_priority = EPriority.GetEnum();
  cb_request: any[];
  cb_responsibleArea: any[];
  cb_customer: any[];
  messageError: string = '';
  form: FormGroup;
  constructor(
    private selectListService: SelectlistService,
    private formBuilder: FormBuilder,
    public config: DynamicDialogConfig,
    public ref: DynamicDialogRef,
    private dataService: DataService,
    private filterReportOperation: FilterReportOperationService
  ) {
    this.onLoadComboBox();
    this.panelDto = this.config.data;
  }

  ngOnInit(): void {
    this.loadForm();
  }

  loadForm() {
    this.form = this.formBuilder.group({
      customer: [this.filterReportOperation.panelDto.customer],
      status: [this.filterReportOperation.panelDto.status],
      responsible: [this.filterReportOperation.panelDto.responsible],
      request: [this.filterReportOperation.panelDto.request],
      requestStart: [this.filterReportOperation.panelDto.requestStart],
      finishedStart: [this.filterReportOperation.panelDto.finishedStart],
      requestEnd: [this.filterReportOperation.panelDto.requestEnd],
      finishedEnd: [this.filterReportOperation.panelDto.finishedEnd],
      priority: [this.filterReportOperation.panelDto.priority],
      folioReporte: [this.filterReportOperation.panelDto.folioReporte],
    });
  }

  onLoadComboBox() {
    this.selectListService.getListAccountForCustomer().subscribe((resp) => {
      this.cb_request = resp;
    });
    this.selectListService.getResponsibleArea().subscribe((resp) => {
      this.cb_responsibleArea = resp;
    });
    this.selectListService.getCustomersActive().subscribe((resp) => {
      this.cb_customer = resp;
    });
  }

  onSubmit() {
    console.log(this.form.value);
    if (
      this.form.get('finishedEnd').value === '' &&
      this.form.get('finishedStart').value === '' &&
      this.form.get('priority').value === '' &&
      this.form.get('request').value === '' &&
      this.form.get('requestEnd').value === '' &&
      this.form.get('requestStart').value === '' &&
      this.form.get('responsible').value === '' &&
      this.form.get('status').value === '' &&
      this.form.get('folioReporte').value === null
    ) {
      this.messageError = 'Seleccione al menos una opcione para filtrar';
      return;
    }
    this.filterReportOperation.setPanelDto(this.form.value);
    this.ref.close(this.form.value);
  }
}
