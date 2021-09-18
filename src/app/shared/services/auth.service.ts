import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { DataService } from './data.service';
import { StorageService } from './storage.service';
import { InfoUserAuthDto } from '../../models/auth/InfoUserAuthDto';
import { environment } from 'src/environments/environment';

const baseUrlImg = environment.base_urlImg;
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  statusJWT: boolean = false;
  public data: ModelToken = new ModelToken();
  public InfoUserAuthDto: InfoUserAuthDto;
  public UserId: string | undefined;
  public customerAuthId: number;

  public isSupervisor: boolean = false;
  public isGerenteMantenimiento: boolean = false;
  public isMantenimiento: boolean = false;
  public isResidente: boolean = false;
  public isSuperUsuario: boolean = false;
  public isColaborador: boolean = false;

  constructor(
    private storageService: StorageService,
    private dataService: DataService
  ) {}
  // : Observable<boolean>
  validationToken(): Observable<boolean> {
    this.data.token = this.storageService.retireve('token');

    return this.dataService.post('Auth/ValidateJwtToken', this.data).pipe(
      map((resp: any) => {
        const {
          id,
          email,
          phone,
          firstName,
          lastName,
          birth,
          photoPath,
          profession,
          customer,
          customerId,
          roles,
        } = resp.body.infoUserAuthDto;
        this.customerAuthId = resp.body.infoUserAuthDto.customerId;

        this.InfoUserAuthDto = new InfoUserAuthDto(
          id,
          email,
          phone,
          firstName,
          lastName,
          birth,
          `${baseUrlImg}Administration/accounts/${photoPath}`,
          profession,
          customer,
          customerId,
          roles
        );
        if (resp.body.token) {
          this.statusJWT = true;
        }

        this.UserId = resp.body.infoUserAuthDto.id;

        this.isSupervisor = this.validationRole('SupervisionOperativa');
        this.isMantenimiento = this.validationRole('Mantenimiento');
        this.isGerenteMantenimiento = this.validationRole(
          'GerenteMantenimiento'
        );
        this.isResidente = this.validationRole('Residente');
        this.isSuperUsuario = this.validationRole('SuperUsuario');
        this.isColaborador = this.validationRole('Colaborador');

        return this.statusJWT;
      }),
      catchError((error) => of(false))
    );
  }

  validationRole(role: string): boolean {
    var roleValid = false;
    this.InfoUserAuthDto.roles.forEach((item) => {
      if (role === item) {
        roleValid = true;
      }
    });
    return roleValid;
  }
  validationRoles(role: string[]): boolean {
    var roleValid = false;
    this.InfoUserAuthDto.roles.forEach((item) => {
      role.forEach((resp) => {
        if (resp === item) {
          roleValid = true;
        }
      });
    });
    return roleValid;
  }
}
export class ModelToken {
  token: string;
}

export class CustomerAuth {
  customerAuthId: number;
}
