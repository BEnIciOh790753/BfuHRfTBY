// 代码生成时间: 2025-09-19 07:07:02
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

// InventoryItem represents a single item in the inventory
interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
}

// InventoryService is responsible for inventory-related operations
@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  private baseUrl = 'https://api.example.com/inventory'; // Base URL for inventory API

  constructor(private http: HttpClient) { }

  // Retrieves all inventory items from the API
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Retrieves a single inventory item by ID
  getItemById(itemId: number): Observable<InventoryItem> {
    const url = `${this.baseUrl}/${itemId}`;
    return this.http.get<InventoryItem>(url).pipe(
      catchError(this.handleError)
    );
  }

  // Adds a new inventory item
  addItem(item: InventoryItem): Observable<InventoryItem> {
    return this.http.post<InventoryItem>(this.baseUrl, item).pipe(
      catchError(this.handleError)
    );
  }

  // Updates an existing inventory item
  updateItem(item: InventoryItem): Observable<any> {
    const url = `${this.baseUrl}/${item.id}`;
    return this.http.put(url, item).pipe(
      catchError(this.handleError)
    );
  }

  // Deletes an inventory item by ID
  deleteItem(itemId: number): Observable<any> {
    const url = `${this.baseUrl}/${itemId}`;
    return this.http.delete(url).pipe(
      catchError(this.handleError)
    );
  }

  // Private method to handle HTTP errors
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.'
    );
  }
}

/*
 * InventoryComponent is the Angular component to display and interact with the inventory.
 */
import { Component, OnInit } from '@angular/core';
import { InventoryService, InventoryItem } from './inventory_service'; // Import the service and interface

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  items: InventoryItem[] = [];
  selectedItem: InventoryItem | null = null;
  isEditing = false;

  constructor(private inventoryService: InventoryService) { }

  ngOnInit(): void {
    this.fetchItems();
  }

  // Fetches all inventory items and sets them to the items array
  fetchItems(): void {
    this.inventoryService.getAllItems().subscribe({
      next: (items) => this.items = items,
      error: (err) => console.error('There was an error!', err)
    });
  }

  // Handles the selection of an inventory item
  selectItem(item: InventoryItem): void {
    this.selectedItem = item;
    this.isEditing = true;
  }

  // Saves the current inventory item
  saveItem(): void {
    if (this.isEditing) {
      this.inventoryService.updateItem(this.selectedItem).subscribe({
        next: () => this.fetchItems(),
        error: (err) => console.error('There was an error!', err)
      });
    } else {
      this.inventoryService.addItem(this.selectedItem).subscribe({
        next: () => this.fetchItems(),
        error: (err) => console.error('There was an error!', err)
      });
    }
    this.selectedItem = null;
    this.isEditing = false;
  }

  // Deletes the selected inventory item
  deleteItem(): void {
    this.inventoryService.deleteItem(this.selectedItem!.id).subscribe({
      next: () => this.fetchItems(),
      error: (err) => console.error('There was an error!', err)
    });
    this.selectedItem = null;
  }
}
