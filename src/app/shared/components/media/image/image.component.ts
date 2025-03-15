import { Component, Input } from '@angular/core';
// import { Perform } from '@classes';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss'
})
export class ImageComponent {
  @Input({ required: true })
  public path!: string;

  @Input({ required: true })
  public title!: string;

  // public mediaPerform = new Perform<string>();

  // constructor(private mediaService: MediaService) {}

  ngOnInit() {
    this.loadData();
  }

  private loadData() {
    // this.mediaPerform.load(this.mediaService.getMediaUrl(this.path));
  }
}
