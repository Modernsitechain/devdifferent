import { Component, input, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputBaseClass } from '@app/core/classes';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@app/shared/validators/validator.class';
import { FormControlStatus } from '@core/enums';
import { InputErrorMessageComponent } from '../../input-error-message/input-error-message.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputErrorMessageComponent, TranslateModule],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends InputBaseClass {

  public disabled = input<boolean>(false);

  public readonly inputStatus = FormControlStatus;
  public readonly badge = input<boolean>(false);

  @Input()
  public inputType: 'number' | 'text'= 'text';

  @Input()
  public autocomplete = 'no-autocomplete';

  @Input()
  public min?: string;

  @Input()
  public max?: string;

  @Input()
  public size: 'sm' | 'md' = 'md';

  @Input()
  public preventEnter = false;

  @Input()
  public paddingRight = 1.25;

  @Input()
  public split?: 'left' | 'right';

  public validators = Validators;

  public onPaste(): void {
    this.control.updateValueAndValidity();
  }

  public override get isDisabled(): boolean {
    return this.disabled();
  }
}
