import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Input()
  public form?: FormGroup;

  @Output()
  public formSubmit = new EventEmitter();

  public onSubmit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.form?.markAllAsTouched();
    this.formSubmit.emit();
  }
}
