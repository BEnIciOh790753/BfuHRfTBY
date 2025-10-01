// 代码生成时间: 2025-10-01 22:43:34
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

// Define the MedicalRecord model
export interface MedicalRecord {
  id: number;
  patientName: string;
  patientId: number;
  medicalHistory: string;
  creationDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ElectronicMedicalRecordService {

  // API endpoint for medical records
  private medicalRecordsUrl = 'http://api.medicalrecords.com/records';

  constructor(private http: HttpClient) {}

  // Add a new medical record
  addMedicalRecord(record: MedicalRecord): Observable<MedicalRecord> {
    return this.http.post<MedicalRecord>(this.medicalRecordsUrl, record).pipe(
      retry(3),
      catchError(this.handleError<MedicalRecord>('addMedicalRecord'))
    );
  }

  // Get medical records by patient ID
  getMedicalRecordsByPatientId(patientId: number): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>(`${this.medicalRecordsUrl}?patientId=${patientId}`).pipe(
      retry(3),
      catchError(this.handleError<MedicalRecord[]>('getMedicalRecordsByPatientId', []))
    );
  }

  // Update an existing medical record
  updateMedicalRecord(record: MedicalRecord): Observable<any> {
    return this.http.put(`${this.medicalRecordsUrl}/${record.id}`, record).pipe(
      retry(3),
      catchError(this.handleError<any>('updateMedicalRecord'))
    );
  }

  // Handle HTTP errors
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an error message.
      return observableThrowError(error.message || operation);
    };
  }
}

/*
 * Usage:
 *
 * 1. Inject the ElectronicMedicalRecordService into your component.
 * 2. Call the corresponding methods to interact with medical records.
 */