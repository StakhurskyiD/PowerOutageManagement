import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddressFormComponent } from '../address-management/address-form/address-form.component';
import { GroupFormComponent } from '../group-management/group-form/group-form.component';
import { GroupListComponent } from '../group-management/group-list/group-list.component';


@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AddressFormComponent, GroupFormComponent, GroupListComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  activeSection: string = 'addresses';

  navigateTo(section: string) {
    this.activeSection = section;
  }
}