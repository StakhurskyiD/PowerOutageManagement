import { IEntity } from './entity.interface';

export class Address implements IEntity {
  id: string; // Guid type
  name: string;
  description: string;
  groupId: string; // Foreign key to Group

  constructor(id: string = '', name: string = '', description: string = '', groupId: string = '') {
    this.id = id;
    this.name = name;
    this.description = description;
    this.groupId = groupId;
  }
}