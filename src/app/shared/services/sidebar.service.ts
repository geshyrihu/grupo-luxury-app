import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  menu: any[] = [];

  Asistente: boolean = true;
  Colaborador: boolean = true;
  GerenteMantenimiento: boolean = true;
  Mantenimiento: boolean = true;
  Contador: boolean = true;
  Residente: boolean = true;
  Sistemas: boolean = true;
  SuperUsuario: boolean = true;
  SupervisionOperativa: boolean = true;

  constructor(private authService: AuthService) {
    this.Asistente = authService.validationRole('Asistente');
    this.Colaborador = authService.validationRole('Colaborador');
    this.GerenteMantenimiento = authService.validationRole(
      'GerenteMantenimiento'
    );
    this.Mantenimiento = authService.validationRole('Mantenimiento');
    this.Contador = authService.validationRole('Contador');
    this.Residente = authService.validationRole('Residente');
    this.Sistemas = authService.validationRole('Sistemas');
    this.SuperUsuario = authService.validationRole('SuperUsuario');
    this.SupervisionOperativa = authService.validationRole(
      'SupervisionOperativa'
    );

    // ...Menu
    this.menu = [
      {
        visible:
          this.SuperUsuario ||
          this.SupervisionOperativa ||
          this.GerenteMantenimiento ||
          this.Contador,
        label: 'Admin Compras',
        icon: 'fas fa-toolbox',
        items: [
          {
            visible:
              this.SuperUsuario ||
              this.SupervisionOperativa ||
              this.GerenteMantenimiento ||
              this.Contador,
            label: 'Catalogo de cuentas',
            routerLink: '/shopping/chartOfAccount',
          },
          {
            visible:
              this.SuperUsuario ||
              this.SupervisionOperativa ||
              this.GerenteMantenimiento ||
              this.Contador,
            label: 'Cedulas Presupuestales',
            routerLink: '/shopping/budgetCard',
          },
          {
            visible: this.SuperUsuario,
            label: 'Uso de CFDI',
            routerLink: '/shopping/useCfdi',
          },
          {
            visible: this.SuperUsuario,
            label: 'Forma de pago',
            routerLink: '/shopping/wayToPay',
          },
          {
            visible: this.SuperUsuario,
            label: 'Metodo de pago',
            routerLink: '/shopping/paymentMethod',
          },
        ],
      },
      {
        visible: this.SuperUsuario,
        label: 'Administration',
        icon: 'fas fa-cogs',
        items: [
          {
            visible: this.SuperUsuario,
            label: 'Áreas Responsable ',
            routerLink: '/common/responsibleareas',
          },
          {
            visible: this.SuperUsuario,
            label: 'Bancos',
            routerLink: '/common/banks',
          },
          {
            visible: this.SuperUsuario,
            label: 'Categorias',
            routerLink: '/common/categories',
          },
          {
            visible: this.SuperUsuario,
            label: 'Clientes',
            routerLink: '/common/customers',
          },
          {
            visible: this.SuperUsuario,
            label: 'Cuentas',
            routerLink: '/admin/accounts/index',
          },
          {
            visible: this.SuperUsuario,
            label: 'Empleados',
            routerLink: '/admin/empleados',
          },
          {
            visible: this.SuperUsuario,
            label: 'Historial de Acceso',
            routerLink: '/admin/historial-acceso',
          },

          {
            visible: this.SuperUsuario,
            label: 'Medidor Categoria',
            routerLink: '/maintenance/indexMedidorCategoria',
          },

          {
            visible: this.SuperUsuario,
            label: 'Permisos',
            routerLink: '/admin/roles',
          },
          {
            visible: this.SuperUsuario,
            label: 'Profesiones',
            routerLink: '/common/professions',
          },
          {
            visible: this.SuperUsuario,
            label: 'Slider',
            routerLink: '/admin/sliderCustomer',
          },
          {
            visible: this.SuperUsuario,
            label: 'Solicitantes',
            routerLink: '/common/requests',
          },
        ],
      },
      {
        visible: this.SuperUsuario,
        label: 'Admin Manto',
        icon: 'fas fa-cogs',
        items: [
          {
            visible: this.SuperUsuario,
            label: 'Medidor Categoria',
            routerLink: '/maintenance/indexMedidorCategoria',
          },
          {
            visible: this.SuperUsuario,
            label: 'Catalogo check',
            routerLink: '/maintenance/CatalogCheckList',
          },
          {
            visible: this.SuperUsuario,
            label: 'Catalgo Instalación',
            routerLink: '/maintenance/CatalogInstallation',
          },

          {
            visible: this.SuperUsuario,
            label: 'Unidades de M.',
            routerLink: '/common/measurementUnits',
          },
        ],
      },
      {
        visible:
          this.Asistente ||
          this.GerenteMantenimiento ||
          this.Mantenimiento ||
          this.Contador ||
          this.Residente ||
          this.SuperUsuario ||
          this.SupervisionOperativa,
        label: 'Compras',
        icon: 'fab fa-shopify',
        items: [
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Mantenimiento ||
              this.Contador ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa,
            label: 'Cedula Presupuestal',
            routerLink: '/shopping/cedulaCliente',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Mantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa,
            label: 'Solicitudes de compra',
            routerLink: '/shopping/purchaseRequest',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Mantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.Contador ||
              this.SupervisionOperativa,
            label: 'Orden de compra',
            routerLink: '/shopping/ordenesCompra',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.Contador ||
              this.SupervisionOperativa,
            label: 'Orden Compra Fijos',
            routerLink: '/shopping/indexGastosFijos',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.Contador ||
              this.SupervisionOperativa,
            label: 'Catalogo gastos Fijos',
            routerLink: '/shopping/catalogoGastosFijos',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.Contador ||
              this.SupervisionOperativa ||
              this.Mantenimiento,
            label: 'Pagadas',
            routerLink: '/shopping/ordenesCompraPagadas',
          },
          // {
          //   visible:
          //     this.Asistente ||
          //     this.GerenteMantenimiento ||
          //     this.Residente ||
          //     this.SuperUsuario ||
          //     this.Contador ||
          //     this.SupervisionOperativa ||
          //     this.Mantenimiento,
          //   label: 'Resumen',
          //   routerLink: '/shopping/ordenesCompraResumen',
          // },
        ],
      },
      {
        visible:
          this.Asistente ||
          this.GerenteMantenimiento ||
          this.Residente ||
          this.SuperUsuario ||
          this.Contador ||
          this.SupervisionOperativa ||
          this.Mantenimiento,
        label: 'Directorio',
        icon: 'fas fa-list-alt',
        items: [
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.Contador ||
              this.SupervisionOperativa ||
              this.Mantenimiento,
            label: 'Condominos',
            routerLink: '/client/listCondomino',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.Contador ||
              this.SupervisionOperativa ||
              this.Mantenimiento,
            label: 'Propiedades',
            routerLink: '/client/directoryCondominium',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.Contador ||
              this.SupervisionOperativa ||
              this.Mantenimiento,
            label: 'Proveedores',
            routerLink: '/client/providers',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.Contador ||
              this.SupervisionOperativa ||
              this.Mantenimiento,
            label: 'Empleados',
            routerLink: '/client/employees',
          },
        ],
      },
      {
        visible:
          this.Asistente ||
          this.GerenteMantenimiento ||
          this.Residente ||
          this.SuperUsuario ||
          this.SupervisionOperativa ||
          this.Mantenimiento,
        label: 'Inventario',
        icon: 'fas fa-boxes',
        items: [
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa ||
              this.Mantenimiento,
            label: 'Productos y Servicios',
            routerLink: '/inventario/productos',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa ||
              this.Mantenimiento,
            label: 'Mi Inventario',
            routerLink: `/inventario/inventarioProductos`,
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa ||
              this.Mantenimiento,
            label: 'Salida de Productos',
            routerLink: '/inventario/salidaProductos',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa ||
              this.Mantenimiento,
            label: 'Entrada de Productos',
            routerLink: '/inventario/entradaProductos',
          },
        ],
      },
      {
        visible:
          this.Asistente ||
          this.GerenteMantenimiento ||
          this.Residente ||
          this.SuperUsuario ||
          this.SupervisionOperativa ||
          this.Mantenimiento ||
          this.Colaborador,
        label: 'Mantenimiento',
        icon: 'fas fa-tools',
        items: [
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa ||
              this.Mantenimiento,
            label: 'Inv. Maquinaria',
            routerLink: '/maintenance/machineries',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa ||
              this.Mantenimiento,
            label: 'Inv. Herramienta',
            routerLink: '/maintenance/tools',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa ||
              this.Mantenimiento,
            label: 'Calendario',
            routerLink: '/maintenance/maintenanceCalendars',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa ||
              this.Mantenimiento,
            label: 'Orden de Servicio',
            routerLink: '/maintenance/maintenanceOrders',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa ||
              this.Mantenimiento,
            label: 'Control Herramienta',
            routerLink: '/maintenance/controlPrestamoHerramientas',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa ||
              this.Mantenimiento ||
              this.Colaborador,
            label: 'Bitacora',
            routerLink: '/maintenance/bitacoraMantenimiento',
          },
          {
            visible:
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa ||
              this.Mantenimiento ||
              this.Colaborador,
            label: 'Cuadrante Bitacora',
            routerLink: '/maintenance/bitacoraCuadrantre',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa ||
              this.Mantenimiento ||
              this.Colaborador,
            label: 'Lecturas',
            routerLink: '/maintenance/indexMedidor',
          },
          {
            visible: true,
            label: 'Guia Recorridos',
            routerLink: '/maintenance/CatalogInstallation',
          },
        ],
      },
      {
        visible: true,
        label: 'Manuales',
        icon: 'fas fa-book-reader',
        items: [
          {
            visible: true,
            label: 'Biblioteca',
            routerLink: '/admin/accounts',
          },
          {
            visible: true,
            label: 'Mantenimiento',
            routerLink: '/manual/mantenimiento',
          },
          {
            visible: true,
            label: 'Residente',
            routerLink: '/manual/residente',
          },
          {
            visible: true,
            label: 'Asistente',
            routerLink: '/manual/asistente',
          },
          {
            visible: true,
            label: 'Tutoriales',
            routerLink: '/client/tutorial',
          },
          {
            visible: this.GerenteMantenimiento,
            label: 'Gerente de Mantenimiento',
            routerLink: '/client/gerenciaMantenimiento',
          },
        ],
      },
      {
        visible:
          this.Asistente ||
          this.GerenteMantenimiento ||
          this.Residente ||
          this.SuperUsuario ||
          this.SupervisionOperativa ||
          this.Mantenimiento ||
          this.Colaborador,
        label: 'Reporte',
        icon: 'fa fa-file',
        items: [
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa ||
              this.Mantenimiento ||
              this.Colaborador,
            label: 'Lista de Tareas',
            routerLink: '/maintenance/operationReport',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa,
            label: 'Call Admin',
            routerLink: '/client/callAdmin',
          },
          {
            visible:
              this.Asistente ||
              this.GerenteMantenimiento ||
              this.Residente ||
              this.SuperUsuario ||
              this.SupervisionOperativa,
            label: 'Minutas',
            routerLink: '/client/meetings',
          },
        ],
      },

      {
        visible: this.Sistemas,
        label: 'Sistemas',
        icon: 'fas fa-sitemap',
        items: [
          {
            visible: this.Sistemas,
            label: 'Reportes',
            routerLink: '/sistemas/reportes',
          },
        ],
      },
      {
        visible: this.SuperUsuario,
        label: 'Supervisión',
        icon: 'fas fa-chalkboard-teacher',
        items: [
          {
            visible: true,
            label: 'Check Edificio',
            routerLink: 'supervision/check-list-edificio',
          },
          {
            visible: true,
            label: 'Master Check Edificio',
            routerLink: 'supervision/master-check-list-edificio',
          },
          {
            visible: true,
            label: 'Cuestionarios',
            routerLink: '/rrhh/cuestionarios',
          },
          {
            visible: true,
            label: 'Evaluación',
            routerLink: '/rrhh/evaluacion',
          },
        ],
      },

      {
        visible: this.SuperUsuario,
        label: 'RRHH',
        icon: 'fas fa-users',
        items: [
          {
            visible: true,
            label: 'Mis Evaluaciones',
            routerLink: 'rrhh/mis-evaluaciones',
          },
          {
            visible: this.SuperUsuario,
            label: 'Plantilla',
            routerLink: 'rrhh/plantillaEmpleados',
          },
          {
            visible: this.SuperUsuario,
            label: 'Evaluaciones',
            routerLink: 'rrhh/plantillaEmpleados',
          },
        ],
      },
      {
        visible: true,
        label: 'Utilidades',
        icon: 'fas fa-calculator',
        items: [
          {
            visible: true,
            label: 'Calculadoras',
            routerLink: 'utilidades/calculadoras',
          },
        ],
      },
    ];
  }
}
