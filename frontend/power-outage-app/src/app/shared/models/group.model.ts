import { IEntity } from './entity.interface';

export class Group implements IEntity {
  id: string; // Guid type
  name: string;
  description: string;

  constructor(id: string = '', name: string = '', description: string = '') {
    this.id = id;
    this.name = name;
    this.description = description;
  }
}