import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output
} from '@angular/core';

@Directive({
  selector: '[appLink]',
  standalone: true
})
export class LinkDirective {
  @Input()
  @HostBinding('class.disabled')
  public isDisabled = false;

  @Input()
  @HostBinding('class')
  public size: 'sm' | 'md' = 'sm';

  @Input()
  @HostBinding('class.stretch')
  public stretch = false;

  @Input()
  @HostBinding('attr.tabindex')
  public tabIndex = 0;

  @HostBinding('class.link')
  public get defaultLinkClass(): boolean {
    return true;
  }

  @Output()
  public clicked = new EventEmitter<void>();

  @HostListener('click')
  @HostListener('keyup.enter')
  public onClick(event: Event): void {
    if (!this.isDisabled) {
      this.clicked.emit();
    }
    event?.stopPropagation();
  }
}
