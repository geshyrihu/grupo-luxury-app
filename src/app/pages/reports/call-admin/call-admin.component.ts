import { Router } from '@angular/router';
import { DataService } from '../../../shared/services/data.service';
import { AuthService } from '../../../shared/services/auth.service';
import { ReportService } from '../../../shared/services/report.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-call-admin',
  templateUrl: './call-admin.component.html',
})
export class CallAdminReportComponent implements OnInit {
  constructor(
    private reportService: ReportService,
    private authService: AuthService,
    private dataService: DataService,
    private router: Router
  ) {}
  data: any[] = [];
  nameCustomer: string = '';
  logoCustomer: string = '';
  ngOnInit(): void {
    this.data = this.reportService.getReportCallAdmin();
    if (!this.data) {
      this.router.navigateByUrl('/client/callAdmin');
    }
  }
}
