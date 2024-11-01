import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { SharedService } from 'src/app/service/shared.service';
import { Platform } from '@ionic/angular';
import * as XLSX from 'xlsx';
import { Directory, Filesystem } from '@capacitor/filesystem';
import write_blob from 'capacitor-blob-writer';
import { LocalNotifications } from '@capacitor/local-notifications';
import { FileOpener } from '@awesome-cordova-plugins/file-opener';
import * as pdfMake from 'pdfmake/build/pdfmake';
const pdfMakeX = require('pdfmake/build/pdfmake');
const pdfFontsX = require('pdfmake/build/vfs_fonts');
pdfMakeX.vfs = pdfFontsX.pdfMake.vfs;

@Component({
  selector: 'app-report-total-client',
  templateUrl: './report-total-client.component.html',
  styleUrls: ['./report-total-client.component.scss'],
})
export class ReportTotalClientComponent implements OnInit {
  // Properties
  siteSearch: boolean = false;
  panelOpenState = false;
  reg_data: any;
  base_url: any;
  NoRecord: boolean = false;
  city_data: any;
  state_data: any;
  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
  documentDefinition: any;
  login: any;
  login_data: any;

  // Constructor
  constructor(
    private _crud: CrudService,
    private _shared: SharedService,
    private _router: Router,
    private _Platform: Platform,
  ) {
    this.login = localStorage.getItem('vakilLoginData');
    this.login_data = JSON.parse(this.login);

    this._crud.get_new_Client(this.login_data.advId).subscribe((res: any) => {
      this.reg_data = res.data;
    });
  }

  async ngOnInit() {
    this._crud.get_new_Client(this.login_data.advId).subscribe(
      (res: any) => {
        console.log(res);
        this.reg_data = res.data;
      }
    )

    const granted = await LocalNotifications.requestPermissions();
    if (granted.display !== 'granted') {
      console.log('Notifications permission not granted');
    }
    LocalNotifications.addListener('localNotificationActionPerformed', (notification) => {
      const fileName = notification.notification.extra?.fileName;
      const fileType = notification.notification.extra?.fileType;
      if (fileName && fileType) {
        this.openFile(fileName, fileType);
      }
    });
  }


  excel() {
    let serialNo = 1;
    const data = this.reg_data.map((reg: any) => ({
      'S.N': serialNo++,
      'Name': reg.clientName,
      'Mobile': reg.contactNum,
      'Email': reg.email,
      'Court': reg.courtName,
      // + add any
    }));
    try {
      this.downloadExcel(data);
      alert("Excel downloaded successfully");
    } catch {
      alert("Excel download failed");
    }
  }


  async downloadExcel(data: any) {
    try {
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Report');
      ws['!cols'] = [{ width: 10 }, { width: 15 }, { width: 15 }, { width: 15 }, { width: 20 }, { width: 20 }];
      ws['!rows'] = [{ hpt: 20 }, { hpt: 20 }, { hpt: 20 }];
      ws['A1'].s = { font: { bold: true }, alignment: { horizontal: 'center' }, fill: { fgColor: { rgb: 'FFFF00' } } };
      const now = new Date();
      const timestamp = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
      const filename = `Excel_${timestamp}.xlsx`;
      if (this._Platform.is('cordova') || this._Platform.is('mobile') || this._Platform.is('android')) {
        const excelBuffer = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });
        const excelData: Blob = new Blob([excelBuffer], { type: this.EXCEL_TYPE });
        await write_blob({
          path: filename,
          directory: Directory.Documents,
          blob: excelData
        });
        this.showNotification('Excel Downloaded', `Your Excel file ${filename} has been saved successfully.`, filename, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      } else {
        XLSX.writeFile(wb, filename);
        this.showNotification('Excel Downloaded', `Your Excel file ${filename} has been saved successfully.`, filename, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      }
    } catch (error) {
      alert("Data not found");
    }
  }

  async PdfDownload() {
    try {
      this.documentDefinition = this.generateDocumentDefinition();
      const now = new Date();
      const timestamp = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2,
        '0')}${String(now.getHours()).padStart(2, '0')}${String(now.getMinutes()).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
      const filename = `PDF_${timestamp}.pdf`;

      if (this._Platform.is('cordova') || this._Platform.is('mobile') || this._Platform.is('android')) {
        pdfMake.createPdf(this.documentDefinition).getBuffer(async (buffer: ArrayBuffer) => {
          await write_blob({
            path: filename,
            directory: Directory.Documents,
            blob: new Blob([buffer])
          });
          this.showNotification('PDF Downloaded', `Your PDF file ${filename} has been saved successfully.`, filename, 'application/pdf');
        });
      } else {
        pdfMake.createPdf(this.documentDefinition).download(filename);
        this.showNotification('PDF Downloaded', `Your PDF file ${filename} has been saved successfully.`, filename, 'application/pdf');
      }
    } catch (error) {
      alert("Error generating PDF");
    }
  }


  generateDocumentDefinition() {
    const content = [];
    content.push({ text: 'Client List', style: 'header' });
    content.push('\n');


    const tableHeaders = [
      { text: 'S.N.', style: 'tableHeader' },
      { text: 'Name', style: 'tableHeader' },
      { text: 'Mobile', style: 'tableHeader' },
      { text: 'Email', style: 'tableHeader' },
      { text: 'Court Name', style: 'tableHeader' },
    ];


    const tableBody = this.reg_data.map((reg: any, index: number) => [
      { text: (index + 1).toString(), style: 'tableBody' },
      { text: reg.clientName, style: 'tableBody' },
      { text: reg.contactNum, style: 'tableBody' },
      { text: reg.email, style: 'tableBody' },
      { text: reg.courtName, style: 'tableBody' },
    ]);


    const table = {
      headerRows: 1,
      widths: ['auto', '*', '*', '*', '*'],
      body: [
        tableHeaders,
        ...tableBody
      ],
    };


    content.push({
      table: table,
      layout: 'lightHorizontalLines'
    });


    return {
      content: content,
      styles: {
        header: {
          fontSize:16,
          bold: true
        },
        tableHeader: {
          bold: true,
          fontSize: 10,
          color: 'black'
        },
        tableBody: {
          fontSize: 10,
        }
      },
      pageSize: 'A4',
      pageMargins: [5, 5, 5, 10],
    };
  }

  async showNotification(title: string, body: string, fileName: string, fileType: string) {
    await LocalNotifications.schedule({
      notifications: [
        {
          title,
          body,
          id: 1,
          schedule: { at: new Date(Date.now() + 100) },
          sound: 'default',
          attachments: [],
          extra: { fileName, fileType }
        }
      ]
    });
  }


  async openFile(fileName: string, fileType: string) {
    try {
      const path = await Filesystem.getUri({
        directory: Directory.Documents,
        path: fileName
      });
      if (path && path.uri) {
        FileOpener.open(path.uri, fileType)
          .then(() => console.log('File is opened'))
          .catch(e => console.log('Error opening file' + JSON.stringify(e)));
      } else {
        alert('File path is null or undefined.');
      }
    } catch (error) {
      alert('Error retrieving file path:' + JSON.stringify(error));
    }
  }
}