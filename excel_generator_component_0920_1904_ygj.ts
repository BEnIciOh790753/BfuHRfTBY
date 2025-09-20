// 代码生成时间: 2025-09-20 19:04:04
 * Features:
 * - Generates Excel files in memory.
 * - Allows for dynamic configuration of the file contents.
 * - Handles errors appropriately.
 */
import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Component({
  selector: 'app-excel-generator',
  templateUrl: './excel_generator_component.html',
  styleUrls: ['./excel_generator_component.css']
})
export class ExcelGeneratorComponent implements OnInit {
  private workbook: Workbook;
  private worksheet: any;
  private error: string | null = null;

  constructor() {
    this.workbook = new Workbook();
    this.worksheet = this.workbook.addWorksheet('My Sheet');
  }

  ngOnInit(): void {
    // Initialize the worksheet with some data.
    this.worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Name', key: 'name', width: 32 },
      { header: 'D.O.B.', key: 'dob', width: 10 },
      { header: 'Email', key: 'email', width: 32 },
    ];
  }

  /*
   * Adds data to the worksheet.
   * @param data An array of objects containing the data to be added.
   */
  addData(data: any[]): void {
    this.worksheet.addRows(data);
  }

  /*
   * Triggers the Excel file generation and download.
   */
  generateExcelFile(): void {
    try {
      this.workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
        saveAs(new Blob([buffer]), 'ExcelFile.xlsx');
      });
    } catch (error) {
      this.handleError(error);
    }
  }

  /*
   * Handles errors by setting the error message.
   * @param error The error that occurred.
   */
  private handleError(error: any): void {
    this.error = error instanceof Error ? error.message : 'An unknown error occurred.';
    console.error('ExcelGeneratorComponent Error:', this.error);
  }

  /*
   * Clears the worksheet and resets the error message.
   */
  clearWorksheet(): void {
    this.worksheet = this.workbook.addWorksheet('My Sheet', {
      id: this.workbook.getWorksheetId(this.worksheet.name)
    });
    this.error = null;
  }

  /*
   * Returns the error message if there is any.
   */
  getErrorMessage(): string | null {
    return this.error;
  }
}
