import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address } from '../models/address.model';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  private baseUrl = 'http://localhost:5001/api/Address'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  getAddresses(): Observable<Address[]> {
    return this.http.get<Address[]>(this.baseUrl);
  }

  getAddressById(id: string): Observable<Address> {
    return this.http.get<Address>(`${this.baseUrl}/${id}`);
  }

  createAddress(address: Address): Observable<Address> {
    return this.http.post<Address>(this.baseUrl, address);
  }

  updateAddress(id: string, address: Address): Observable<Address> {
    return this.http.put<Address>(`${this.baseUrl}/${id}`, address);
  }

  deleteAddress(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}