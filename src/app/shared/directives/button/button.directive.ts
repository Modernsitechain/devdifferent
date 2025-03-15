import { Directive, HostBinding, Input } from '@angular/core';

export type ButtonVarriant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'red'
  | 'moovd-light-blue-50'
  | 'white'
  | 'danger';
@Directive({
  selector: '[appButton]',
  standalone: true
})
export class ButtonDirective {
  @Input()
  public appButton?: ButtonVarriant | '';

  @Input()
  public loading = false;

  @Input()
  public square = false;

  @Input()
  public rounded = false;

  @Input()
  public round = false;

  @Input()
  public shrink = false;

  @Input()
  public stretch = false;

  @Input()
  public shadow = false;

  @Input()
  public size: 'lg' | 'md' | 'sm' = 'md';

  @Input()
  public isDisabled = false;

  @HostBinding('disabled')
  public get disabled(): boolean {
    return this.isDisabled ? this.isDisabled : this.loading;
  }

  @HostBinding('class')
  public get classes(): string[] {
    const classes = ['button', this.size];

    this.appButton ? classes.push(this.appButton) : classes.push('default');
    this.square && classes.push('square');
    this.rounded && classes.push('rounded');
    this.stretch && classes.push('stretch');
    this.shrink && classes.push('shrink');
    this.isDisabled && classes.push('disabled');
    this.loading && classes.push('loading');
    this.round && classes.push('round');
    this.shadow && classes.push('shadow');
    return classes;
  }
}
