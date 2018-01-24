import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mw-log-item',
  templateUrl: './log-item.component.html',
  styleUrls: ['./log-item.component.css']
})
export class LogItemComponent {
  @Input() logItem;
  logItems: string
  @Output() delete = new EventEmitter();

  onDelete() {
    this.delete.emit(this.logItem);
  }
}
