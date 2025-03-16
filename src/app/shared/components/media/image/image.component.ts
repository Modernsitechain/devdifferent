import { Component, inject, input, signal } from '@angular/core';
import { AwsS3Service } from '@core/services/aws-s3/aws-s3.service';

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [],
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  public path = input.required<string>();
  
  private readonly awsS3Service = inject(AwsS3Service);
  
  public fileUrl = signal<string | undefined>(undefined);

  public async showFiles() {
    const files = await this.awsS3Service.getFileUrl(this.path());
    console.log('S3 Files:', files);
  }
}
