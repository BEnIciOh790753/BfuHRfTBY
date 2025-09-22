// 代码生成时间: 2025-09-22 15:36:33
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// 网络连接状态检查器服务
@Injectable({
  providedIn: 'root'
})
export class NetworkStatusCheckerService {

  private apiUrl = 'https://www.google.com'; // 用于检查网络连接的API URL

  constructor(private http: HttpClient) { }

  // 检查网络连接状态
  checkNetworkStatus(): Observable<boolean> {
    return this.http.get(this.apiUrl).pipe(
      catchError(error => {
        // 如果请求失败，则认为网络连接不可用
        if (error.status === 0 || error.status === 7) {
          // 网络错误
          return throwError(false);
        } else {
          // 服务器错误或其他错误
          return throwError(error);
        }
      }),
      // 如果请求成功，则认为网络连接可用
      map(response => true)
    );
  }
}

// 网络连接状态检查器组件
import { Component, OnInit } from '@angular/core';
import { NetworkStatusCheckerService } from './network_status_checker.service';

@Component({
  selector: 'app-network-status-checker',
  template: `
    <p *ngIf="networkStatus !== null" [ngClass]="{'online': networkStatus, 'offline': !networkStatus}">
      {{ networkStatus ? 'Online' : 'Offline' }}
    </p>
  `,
  styles: [
    '.online { color: green; }',
    '.offline { color: red; }'
  ]
})
export class NetworkStatusCheckerComponent implements OnInit {
  networkStatus: boolean | null = null;

  constructor(private networkStatusCheckerService: NetworkStatusCheckerService) { }

  ngOnInit() {
    this.checkNetworkStatus();
  }

  // 检查网络连接状态
  checkNetworkStatus(): void {
    this.networkStatusCheckerService.checkNetworkStatus().subscribe(
      result => {
        this.networkStatus = result;
      },
      error => {
        // 错误处理
        this.networkStatus = error instanceof Error ? false : error;
        console.error('Error checking network status:', error);
      }
    );
  }
}
