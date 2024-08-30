import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = 'http://localhost:5001/api/Group'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  // Get all groups
  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}`);
  }

  // Get a group by ID
  getGroupById(id: string): Observable<Group> {
    return this.http.get<Group>(`${this.apiUrl}/${id}`);
  }

  // Create a new group
  createGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(`${this.apiUrl}`, group);
  }

  // Update an existing group
  updateGroup(id: string, group: Group): Observable<Group> {
    return this.http.put<Group>(`${this.apiUrl}/${id}`, group);
  }

  // Delete a group by ID
  deleteGroup(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}