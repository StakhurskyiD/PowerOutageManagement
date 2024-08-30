import { IEntity } from './entity.interface';

export class Schedule implements IEntity {
  id: string; // Guid type
  day: string; // e.g., "Monday", "Tuesday"
  startTime: Date; // Start time of the schedule
  finishTime: Date; // End time of the schedule
  groupId: string; // Foreign key to Group

  constructor(id: string = '', day: string = '', startTime: Date = new Date(), finishTime: Date = new Date(), groupId: string = '') {
    this.id = id;
    this.day = day;
    this.startTime = startTime;
    this.finishTime = finishTime;
    this.groupId = groupId;
  }
}