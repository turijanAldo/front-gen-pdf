import Swal from 'sweetalert2';
import { Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
import { Router } from '@angular/router';

const Toast = Swal.mixin({
  toast: true,
  position: 'top',
  showConfirmButton: false,
  timer: 5000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
});


export class Util {

  formatDateToStringFormat(date: string) {
    //convert YYYY-mm-dd to dd mmm YYYY
    if (date != '') {
      let stringFormat = '';
      const array = date.split("-");
      stringFormat += array[2];
      stringFormat += ' ';

      switch (array[1]) {
        case '01':
          stringFormat += 'ene';
          break;
        case '02':
          stringFormat += 'feb';
          break;
        case '03':
          stringFormat += 'mar';
          break;
        case '04':
          stringFormat += 'abr';
          break;
        case '05':
          stringFormat += 'may';
          break;
        case '06':
          stringFormat += 'jun';
          break;
        case '07':
          stringFormat += 'jul';
          break;
        case '08':
          stringFormat += 'ago';
          break;
        case '09':
          stringFormat += 'sep';
          break;
        case '10':
          stringFormat += 'oct';
          break;
        case '11':
          stringFormat += 'nov';
          break;
        case '12':
          stringFormat += 'dic';
          break;
      }
      stringFormat += ' ';
      stringFormat += array[0];

      return stringFormat;
    }
    else {
      return '';
    }


  }
  formatDate(date: string) {
    let f: Date;
    f = new Date(date);
    date = (f.getDate() < 10 ? '0' + f.getDate() : f.getDate()) + '/'
      + ((f.getMonth() + 1) < 10 ? '0' + (f.getMonth() + 1) : f.getMonth() + 1) + '/'
      + f.getFullYear() + ' '
      + (f.getHours() < 10 ? ('0' + f.getHours()) : f.getHours()) + ':'
      + (f.getMinutes() < 10 ? '0' + f.getMinutes() : f.getMinutes())
    return date;
  }
  formatDateFilter(date: string): string {
    let aux: string;
    var fecha = moment(date, 'YYYY/MM/d')
    if (date) {
      const f = new Date(date);
      aux = ((f.getDate() + 1) < 10 ? '0' + (f.getDate() + 1) : (f.getDate() + 1)) + '/'
        + ((f.getMonth() + 1) < 10 ? '0' + (f.getMonth() + 1) : f.getMonth() + 1) + '/'
        + f.getFullYear();
    }
    return aux;
  }
  formatDateFilter2(date: string): string {
    let aux: string;
    var fecha = moment(date, 'YYYY/MM/d')
    if (date) {
      const f = new Date(date);
      aux = ((f.getDate()) < 10 ? '0' + (f.getDate()) : (f.getDate())) + '/'
        + ((f.getMonth() + 1) < 10 ? '0' + (f.getMonth() + 1) : f.getMonth() + 1) + '/'
        + f.getFullYear();
    }
    return aux;
  }

  okToast(message: string) {
    Toast.fire({
      icon: "info",
      width: '300px',
      title: '<span style="color:#FCF9F8">' + message + '</span>',
      background: '#28a745',
      iconHtml: '<i style="color:#FCF9F8" class="fas fa-check fa-sm"></i>'
    });
  }

  errorToast(message: string) {
    Toast.fire({
      icon: "error",
      width: '300px',
      title: '<span style="color:#FCF9F8">' + message + '</span>',
      background: '#B9313A',
      iconHtml: '<i style="color:#FFFFFF" class="fas fa-times"></i>'
    });
  }

  informationToast(message: string, width: string = '300px') {
    Toast.fire({
      width: width,
      icon: 'question',
      title: '<span style="color:#FCF9F8">' + message + '</span>',
      background: '#64b5f6',
      iconHtml: '<i style="color:#FCF9F8" class="fas fa-info"></i>'
    });
  }

  informationToastBrowser(message: string, width: string = '300px') {
    Toast.fire({
      width: width,
      icon: 'question',
      html: '<span style="color:#FFFFFF">' + message + '</span>',
      background: '#64b5f6',
      iconHtml: '<i style="color:#FCF9F8" class="fas fa-info"></i>'
    });
  }

  warningToast(message: string) {
    Toast.fire({
      icon: 'warning',
      width: '300px',
      title: message,
      background: 'rgb(248, 168, 55)',
      iconHtml: '<i style="color:#E30909" class="fas fa-exclamation"></i>'
    });
  }

  confirmationAlert = (message: string, confirmButtonText: string,
    cancelButtonText: string, showCancelButton: boolean, showConfirmButton: boolean) => {
    return Swal.fire({
      title: `${message}`,
      text: '',
      icon: 'warning',
      showCancelButton: showCancelButton,
      showConfirmButton: showConfirmButton,
      confirmButtonColor: '#17a2b8',
      cancelButtonColor: '#B9313A',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText
    });
  }

  loading() {
    return Swal.fire({
      background: "rgba(0,0,0,0)",
      title: '<div class="spinner-border text-info" style="width: 5rem; height: 5rem;" role="status"><span class="sr-only"></span></div>',
      showConfirmButton: false,
      allowOutsideClick: false
    })
  }

  redirectLastNavigationURL(router: Router): void {
    if (sessionStorage.getItem('lastNavigationURL') !== null) {
      let url: string = sessionStorage.getItem('lastNavigationURL');
      router.navigate([url]);
    }
  }

  removeEventListenerTimeOut(eventList?: Array<string>) {
    if (!eventList) {
      eventList = ['click', 'wheel', 'keyup', 'mouseover', 'touchstart', 'touchmove', 'scroll'];
    }
    eventList.some((event: string) => document.body.removeEventListener(event, null, false));
  }

  replaceNewLine(text: string): any {
    if (text.match(new RegExp(/\\n/g, "g"))) {
      return text.replace(new RegExp(/\\n/g, "g"), match => {
        return '\n';
      });
    }
    return text;
  }

}

export class FormControls {
  validAlphanumeric(): string {
    return "^[a-zñ A-ZÑ0-9.-_\"\´\']+$";
  }
  validMail(): string {
    return "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$"
  }
  validPassword(): string {
    return ""
  }
  select = new FormControl(null, [Validators.required]);
  textNoRequired = new FormControl('', [Validators.minLength(2), Validators.pattern(this.validAlphanumeric()), Validators.maxLength(600), Validators.max(600)]);
  mail = new FormControl('', [Validators.minLength(2), Validators.pattern(this.validMail()), Validators.maxLength(600), Validators.max(600)]);
  text = new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(this.validAlphanumeric()), Validators.maxLength(600), Validators.max(600)]);
  password = new FormControl('', [Validators.required, Validators.minLength(2), Validators.pattern(this.validPassword()), Validators.maxLength(600), Validators.max(600)]);
}

export class MessagesError {

  public required(): string {
    return "El campo es requerido";
  }
  public minLength(): string {
    return "El mínimo de caracteres es 2";
  }
  public pattern(): string {
    return "No se permiten los siguientes caracteres (¡#$%&/*;{}[]°?¡¿@!)";
  }
  public maxLenght(): string {
    return "No se permiten más de 600 caracteres";
  }
  public mail(): string {
    return "El mail introducido no cumple con el formato";
  }
  public errorServer(): string {
    return "Se produjo un error al recuperar la información del servidor";
  }
  public searchError(): string {
    return "No se encontraron coincidencias con la busqueda ingresada";
  }

  public _INFO_LOGIN_EXISTS_ACTIVE_SESSION = '<p>Ya existe una sesión activa en el sistema para tu usuario,'
    .concat(' probablemente por cierre inesperado del sistema.')
    .concat(' <br>Último acceso desde la IP <strong>{0}</strong> el <strong>{1}</strong> a las <strong>{2}</strong> hrs.</p>');

  public _WARN_BROWSER_UNSUPPORTED = 'El navegador que estás utilizando no es el más recomendable y algunas funcionalidades podrían no operar, te recomendamos utilizar:';

  public _ERROR_LOGIN_USER_OR_PASS_INCORRECT = 'Usuario y/o contraseña incorrectos';
  public _ERROR_LOGIN_MISSING_DATA = 'Ingresar el usuario y/o contraseña';
  public _ERROR_LOGIN_CHANGE_CURRENT_PASS_INCORRECT = 'Contraseña actual incorrecta';

  public _0_SERVER_CONNECTION_ERROR = 'Ha ocurrido un error de comunicación con el servidor.';

  public _401_EXISTS_ACTIVE_SESSION = 'Este usuario ya cuenta con una sesión activa.';
  public _401_INVALID_SESSION = 'Sesión actual inválida.';
  public _403_FORBIDDEN_ACCESS = 'Usuario no cuenta con los permisos necesarios.';

  public _500_GENERAL_ERROR = 'Ha ocurrido un error inesperado. Intente más tarde.';

}

export const confirmationAlert = (message: string) => {
  return Swal.fire({
    title: `${message}`,
    text: '',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#17a2b8',
    cancelButtonColor: '#B9313A',
    confirmButtonText: 'Cerrar sesiones',
    cancelButtonText: 'Cancelar'
  });
}

export const convertToUseTable = (CatalogValue, Catalog, ParentValue, description, creationAt, modificationAt, creationBy, modificationBy, status) => {
  return {
    "idCatCatalogValue": CatalogValue,
    "idCatCatalog": Catalog,
    "idCatParentValue": ParentValue,
    "description": description,
    "creationDate": creationAt,
    "modificationDate": modificationAt,
    "creationUser": creationBy,
    "modificationUser": modificationBy,
    "status": status
  }
}

export const confirmatioQuestionnAlert2 = (message: string) => {
  return Swal.fire({
    title: `${message}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'rgb(129, 184, 97)',
    cancelButtonColor: 'rgb(241, 140, 85)',
    confirmButtonText: 'Si',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.value) {
      /*Swal.fire(
        'Por tu valiosa participación ¡Gracias!',
        'Cualquier duda o comentario puedes contactarte al área de Capital Humano',
        'success',
      )*/
      Swal.fire({
        title: 'Por tu valiosa participación ¡Gracias!',
        text: 'Cualquier duda o comentario puedes contactarte al área de Capital Humano',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: 'rgb(129, 184, 97)',
      });
    } return result.value;
  })
}

