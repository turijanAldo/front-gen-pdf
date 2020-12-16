import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import * as html2pdf from 'html2pdf.js';
import { ItemFile, TestBytesPdf, File,Response, requestBody } from './models/ModelFile';
import { HttpdService } from './services/httpd.service';

const URL_BASE = 'http://localhost:8080/api/v1/files';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'html2pdf2bytes';
  bytes = '';
  files: [] = [];

  constructor(private http: HttpClient, private serviceHttpd: HttpdService) {
  }

  ngOnInit() {
    this.files.length = 0;
    // this.http.get<Response<File>>(URL_BASE).subscribe(data => {
    //   console.log("Files::: ", data);
    //   this.files = data.data;
    // });
    
    this.serviceHttpd.getFiles().subscribe(data =>{
      this.files = data.data;
      console.log(data.data)
      console.log(":: onInit ::")
    });

  }

  getBytes(): Promise<any> {
    let element = document.getElementById('element-to-print');
    let optbytes = {
      margin: 0.5,
      filename: 'Niveles de Riesgo.pdf',
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: { scale: 2, scrollX: 0, scrollY: 0 },
      // jsPDF: { unit: 'in', format: 'letter', orientation: 'landscape', style: 'F' }
      jsPDF: { unit: 'in', orientation: 'portrait', style: 'F' }
      //pagebreak: { mode: 'avoid-all' }
      // pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };
    // New Promise-based usage:
    // html2pdf().from(element).set(opt).save();
    let data = html2pdf().from(element).set(optbytes).toPdf().output('datauristring').then(function (pdfAsString: string) {
      // The PDF has been converted to a Data URI string and passed to this function.
      // Use pdfAsString however you like (send as email, etc)! For instance:
      // console.log(pdfAsString);
      // this.bytes = pdfAsString;
      return pdfAsString.split(',')[1];
    });

    // console.log(data);
    return data;
  }

  dowloadFile(id: number) {
      this.serviceHttpd.getById(id).subscribe(data =>{   
      console.log("File By Id ::: ", data);
      console.log(data.data);
      const byteArray = new Uint8Array(atob(data.data.file).split('').map(char => char.charCodeAt(0)));
      console.log(data.data.file);
      const pdfInBase64 = byteArray;
      const newBlob = new Blob([pdfInBase64], { type: 'application/pdf' });
      const linkElement = document.createElement('a');
      const url = URL.createObjectURL(newBlob);

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(newBlob); // For IE browser
      }
      let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
      if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
        linkElement.setAttribute("target", "_blank");
      }

      linkElement.setAttribute('href', url);
      linkElement.setAttribute('download', data.data.name);
      linkElement.style.visibility = "hidden";
      linkElement.click();
    });

    
  }


  saveFile() {
    this.getBytes().then(data => {
      // let request = {
      //   name: 'Archivo xyz',
      //   file: data
      // }
      let req = new requestBody();
      req.name = "xyx"+Math.random() * (10-5);
      req.file = data;
      //this.http.post<Response<any>>(URL_BASE + '/save', req).subscribe(data => {
      this.serviceHttpd.postSave(req).subscribe(data =>{
        console.log("Response save data :: ", data);
        this.ngOnInit();
      });
    }).finally(()=>{
      console.log("finally ");
    });
  }



}

