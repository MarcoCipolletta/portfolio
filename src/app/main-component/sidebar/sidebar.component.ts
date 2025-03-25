import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() open: boolean = false;
  @Output() closing = new EventEmitter<boolean>();

  close() {
    this.closing.emit(false);
  }
}
