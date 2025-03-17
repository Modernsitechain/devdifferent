import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  input,
  Input,
  model,
  Output,
  signal,
  viewChild
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { InputBaseClass, Perform } from '@app/core/classes';
import { MediaService } from '@core/services';
import { getDynamicSize, getFileName } from '@shared/functions';
import { MediaInterface } from '@core/interfaces';
import { TranslateModule } from '@ngx-translate/core';
import { IconComponent } from '@shared/components';
import { InputErrorMessageComponent } from '@shared/components/input-error-message/input-error-message.component';
import { MediaViewDialogComponent } from '@shared/components/dialog';
import { DialogService } from '@core/services';
import { ImageComponent } from '@shared/components/media/image/image.component';

@Component({
  selector: 'app-file-input',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    ImageComponent,
    InputErrorMessageComponent,
    IconComponent
  ],
  templateUrl: './file-input.component.html',
  styleUrl: './file-input.component.scss',
})
export class FileInputComponent extends InputBaseClass {
  public dialogService = inject(DialogService);

  @Input()
  public maxDimension!: number;

  @Input()
  public maxSizeKb!: number;

  @Input({ required: true })
  public validFileType: string[] = [];

  @Output()
  public onDropFile = new EventEmitter<MediaInterface>();

  public fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');
  public currentData = model<any>();
  public accessableFileType = input.required<string>();
  public accessableFileTypeText = input.required<string>();
  public fileType = input<'image' | 'video' | 'audio'>('image');

  public mediaPerform = new Perform<string>();
  public dragging = signal<boolean>(false);
  public progress = signal<number>(20);
  public videoPreview = signal<any>(null);
  public file = signal<File | null>(null);
  public imageSrc = signal<any>(null);
  public error = signal<boolean>(false);
  public loading = signal<boolean>(false);

  constructor() {
    super();
  }

  public ngOnInit() {
    if (this.currentData != undefined) {
      this.control.setValue(this.currentData());
      this.getFileFromAWS(this.currentData()?.url);
    }
  }

  public onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragging.set(true);
  }

  public onDragLeave() {
    this.dragging.set(false);
  }

  public onFileSelect() {
    this.fileInput()?.nativeElement.click();
  }

  public onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragging.set(false);
    const droppedFiles = event.dataTransfer?.files;

    if (droppedFiles) {
      const file = droppedFiles[0];
      this.videoPreview.set(URL.createObjectURL(file));
      this.handleFiles(droppedFiles[0]);
    }
  }

  public onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      const file = input.files[0];
      this.videoPreview.set(URL.createObjectURL(file));
      this.handleFiles(input.files[0]);
    }
  }

  private handleFiles(file: File) {
    // check type
    if (this.validFileType) {
      if (!this.validFileType.includes(file.type)) {
        this.error.set(true);
        return;
      }
    }

    // check size
    if (this.maxSizeKb) {
      if (file.size > this.maxSizeKb * 1024) {
        this.error.set(true);
        this.control.setValue(undefined);
        return;
      }
    }

    this.file.set(file);
    this.loading.set(true);
    this.previewImage(file);
    const uploadInterval = setInterval(() => {
      this.progress.update((currentData) => (currentData += 10));
      if (this.progress() >= 100) {
        clearInterval(uploadInterval);
        this.loading.set(false);
      }
    }, 100);
  }

  public getFileSize(fileSize: number | undefined): string {
    if (fileSize) {
      return getDynamicSize(fileSize);
    }
    return '';
  }

  private async previewImage(file: File): Promise<void> {
    const img = new Image();
    const readerDataURL = new FileReader();
    const readerArrayBuffer = new FileReader();

    if (this.fileType() === 'video' || this.fileType() === 'audio') {
      this.imageSrc.set('assets/images/gray.png');
    } else {
      const dataURL = await this.readFileAsDataURL(file);
      img.src = dataURL;
      this.imageSrc.set(dataURL);

      const isOversized = await this.checkImageSize(img);
      if (isOversized) {
        this.error.set(true);
        this.file.set(null);
        return;
      }
    }

    const arrayBuffer = await this.readFileAsArrayBuffer(file);
    const formattedName = file.name
      .toLowerCase()
      .replace(/\s+/g, '_')
      .split('.')[0];

    let fileInputValue: MediaInterface = {
      title: formattedName + '_' + getFileName(file.type),
      value: arrayBuffer,
      size: file.size
    };

    this.onDropFile.emit(fileInputValue);
    this.control.setValue(fileInputValue);
    this.error.set(false);
  }

  private readFileAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  private readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as ArrayBuffer);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  }

  private checkImageSize(img: HTMLImageElement): Promise<boolean> {
    return new Promise((resolve) => {
      img.onload = () => {
        resolve(
          img.width > this.maxDimension && img.height > this.maxDimension
        );
      };
    });
  }

  public removeFile(): void {
    this.file.set(null);
    this.imageSrc.set(null);
    this.control.setValue(null);
    this.currentData.set(undefined);
    this.onDropFile.emit(undefined);
  }

  public openMediaViewDetail(data: {
    media: string | ArrayBuffer | null;
    mediaType: 'video' | 'image' | 'audio';
  }) {
    this.dialogService.open(MediaViewDialogComponent, data, true, true);
  }

  private getFileFromAWS(path: string) {
    // this.mediaPerform.load(this.mediaService.getMediaUrl(path));
  }
}
