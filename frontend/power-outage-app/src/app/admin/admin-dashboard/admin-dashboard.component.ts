import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddressFormComponent } from '../address-management/address-form/address-form.component';
import { GroupFormComponent } from "../group-management/group-form/group-form.component";

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, AddressFormComponent, GroupFormComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  activeSection: string = 'addresses';

  navigateTo(section: string) {
    this.activeSection = section;
  }
}