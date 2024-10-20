// group.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group.model';
import { CreateGroupDto } from 'src/app/admin/models/create-group.model';

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl = 'http://localhost:5001/api/Group'; // Ensure this URL is correct

  constructor(private http: HttpClient) {}

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${this.apiUrl}`);
  }

  createGroup(group: CreateGroupDto): Observable<Group> {
    console.log("SERVICE: CREATE GROUP", group);
    return this.http.post<Group>(`${this.apiUrl}`, group);
  }

  updateGroup(id: string, group: Group): Observable<Group> {
    return this.http.put<Group>(`${this.apiUrl}/${id}`, group);
  }
}