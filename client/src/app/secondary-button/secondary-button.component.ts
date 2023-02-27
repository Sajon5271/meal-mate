import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-secondary-button',
  templateUrl: './secondary-button.component.html',
  styleUrls: ['./secondary-button.component.css'],
})
export class SecondaryButtonComponent {
  @Input() type: string = 'button';
  @Input() text: string = '';
  @Output() clicked = new EventEmitter();
  handleClick(): void {
    this.clicked.emit();
  }
}
