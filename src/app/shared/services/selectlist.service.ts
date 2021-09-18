import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
const urlBase = environment.base_url;
const urlImgBase = environment.base_urlImg;
@Injectable({
  providedIn: 'root',
})
export class SelectlistService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  getCustomersActive() {
    return this.http.get(urlBase + 'Combobox/customers').pipe(
      map((resp: any[]) =>
        resp.map((selectList) => ({
          value: selectList.id,
          label: selectList.nameCustomer,
          img: selectList.photoPath,
          // img: urlImgBase + 'Administration/customer/' + selectList.photoPath,
        }))
      )
    );
  }
  getListAccountForCustomer() {
    return this.http
      .get(
        urlBase +
          'Combobox/GetListAccountForCustomer/' +
          this.authService.customerAuthId
      )
      .pipe(
        map((resp: any[]) =>
          resp.map((selectList) => ({
            value: selectList.value,
            label: selectList.label,
          }))
        )
      );
  }

  getProfessions() {
    return this.http.get(urlBase + 'Combobox/Professions').pipe(
      map((resp: any[]) =>
        resp.map((selectList) => ({
          value: selectList.id,
          label: selectList.nameProfession,
        }))
      )
    );
  }

  getCategories() {
    return this.http.get(urlBase + 'Combobox/Categories').pipe(
      map((resp: any[]) =>
        resp.map((listCategories) => ({
          value: listCategories.id,
          label: listCategories.nameCotegory,
        }))
      )
    );
  }
  getMachinery() {
    return this.http
      .get(`${urlBase}ComboBox/Machineries/${this.authService.customerAuthId}`)
      .pipe(
        map((resp: any[]) =>
          resp.map((x) => ({
            value: x.id,
            label: x.nameMachinery,
          }))
        )
      );
  }
  getProviders() {
    return this.http.get(`${urlBase}ComboBox/Providers`).pipe(
      map((resp: any[]) =>
        resp.map((x) => ({
          value: x.id,
          label: x.nameProvider,
        }))
      )
    );
  }
  getRequest() {
    return this.http.get(`${urlBase}ComboBox/Request`).pipe(
      map((resp: any[]) =>
        resp.map((x) => ({
          value: x.id,
          label: x.nameRequest,
        }))
      )
    );
  }
  getResponsibleArea() {
    return this.http.get(`${urlBase}ComboBox/ResponsibleArea`).pipe(
      map((resp: any[]) =>
        resp.map((x) => ({
          value: x.id,
          label: x.nameArea,
        }))
      )
    );
  }
  getDirectoryCondominium() {
    return this.http
      .get(
        `${urlBase}ComboBox/DirectoryCondominium/${this.authService.customerAuthId}`
      )
      .pipe(
        map((resp: any[]) =>
          resp.map((x) => ({
            value: x.id,
            label: x.fullName,
          }))
        )
      );
  }
  getEmployee() {
    return this.http
      .get(`${urlBase}ComboBox/Employee/${this.authService.customerAuthId}`)
      .pipe(
        map((resp: any[]) =>
          resp.map((x) => ({
            value: x.id,
            label: x.fullName,
          }))
        )
      );
  }

  getListCondomino(customerId: number) {
    return this.http.get(`${urlBase}ComboBox/ListCondomino/${customerId}`).pipe(
      map((resp: any[]) =>
        resp.map((x) => ({
          value: x.id,
          label: x.nameDirectoryCondominium,
        }))
      )
    );
  }
  getListAdministration(customerId: number) {
    return this.http
      .get(`${urlBase}ComboBox/ListAdministration/${customerId}`)
      .pipe(
        map((resp: any[]) =>
          resp.map((x) => ({
            value: x.id,
            label: x.name,
          }))
        )
      );
  }
  getMeetingPositionComite() {
    return this.http.get(`${urlBase}ComboBox/MeetingPositionComite/`).pipe(
      map((resp: any[]) =>
        resp.map((x) => ({
          value: x.id,
          label: x.position,
        }))
      )
    );
  }
  getMeetingPositionAdministration() {
    return this.http
      .get(`${urlBase}ComboBox/MeetingPositionAdministration/`)
      .pipe(
        map((resp: any[]) =>
          resp.map((x) => ({
            value: x.id,
            label: x.position,
          }))
        )
      );
  }
  getMeetingPositionInvited() {
    return this.http.get(`${urlBase}ComboBox/MeetingPositionInvited/`).pipe(
      map((resp: any[]) =>
        resp.map((x) => ({
          value: x.id,
          label: x.position,
        }))
      )
    );
  }
  getBank() {
    return this.http.get(`${urlBase}ComboBox/Bank`).pipe(
      map((resp: any[]) =>
        resp.map((x) => ({
          value: x.id,
          label: x.shortName,
        }))
      )
    );
  }
  getChartOfAccount() {
    return this.http.get(`${urlBase}ComboBox/GetAllChartOfAccounts`).pipe(
      map((resp: any[]) =>
        resp.map((x) => ({
          value: x.id,
          label: x.description,
        }))
      )
    );
  }
  getProducts() {
    return this.http.get(`${urlBase}ComboBox/GetProducts`).pipe(
      map((resp: any[]) =>
        resp.map((x) => ({
          value: x.value,
          label: x.label,
        }))
      )
    );
  }
  getMeasurementUnits() {
    return this.http.get(`${urlBase}ComboBox/getMeasurementUnits`).pipe(
      map((resp: any[]) =>
        resp.map((x) => ({
          value: x.id,
          label: x.descripcion,
        }))
      )
    );
  }

  // ...Metodo de Pago

  getUseCFDI() {
    return this.http.get(`${urlBase}ComboBox/getUseCFDI`).pipe(
      map((resp: any[]) =>
        resp.map((x) => ({
          value: x.id,
          label: `${x.codigo} ${x.descripcion}`,
        }))
      )
    );
  }

  // ...Forma de  Pago
  getWayToPay() {
    return this.http.get(`${urlBase}ComboBox/getWayToPay`).pipe(
      map((resp: any[]) =>
        resp.map((x) => ({
          value: x.id,
          label: `${x.codigo} ${x.descripcion}`,
        }))
      )
    );
  }

  // ...Uso de CFDI

  getPaymentMethod() {
    return this.http.get(`${urlBase}ComboBox/GetPaymentMethod`).pipe(
      map((resp: any[]) =>
        resp.map((x) => ({
          value: x.id,
          label: `${x.codigo} ${x.descripcion}`,
        }))
      )
    );
  }
  getTool(customerId: number) {
    return this.http.get(`${urlBase}Tools/GetComboBox/${customerId}`).pipe(
      map((resp: any[]) =>
        resp.map((x) => ({
          value: x.value,
          label: x.label,
        }))
      )
    );
  }
  getMedidorCategoria() {
    return this.http.get(`${urlBase}ComboBox/MedidorCategoria`).pipe(
      map((resp: any[]) =>
        resp.map((x) => ({
          value: x.id,
          label: x.nombreMedidorCategoria,
        }))
      )
    );
  }

  GetUserCustomer(customerId: number) {
    return this.http
      .get(`${urlBase}ComboBox/GetUserCustomer/${customerId}`)
      .pipe(
        map((resp: any[]) =>
          resp.map((x) => ({
            value: x.value,
            label: x.label,
          }))
        )
      );
  }
}
