import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbComponent } from '@shared/components';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterModule, BreadcrumbComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {

}
