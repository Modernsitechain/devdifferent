import { Injectable } from '@angular/core';
import { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from '@aws-sdk/client-s3';

@Injectable({
  providedIn: 'root'
})
export class AwsS3Service {
  private s3Client: S3Client;
  private bucketName = 'your-bucket-name';
  private region = 'your-region';
  
  constructor() {
    this.s3Client = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: 'YOUR_ACCESS_KEY',
        secretAccessKey: 'YOUR_SECRET_KEY',
      },
    });
  }

  /** Upload a file */
  async uploadFile(file: File): Promise<void> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: file.name,
        Body: file,
        ContentType: file.type
      });

      await this.s3Client.send(command);
      console.log(`File ${file.name} uploaded successfully.`);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  }

  /** Get file URL */
  async getFileUrl(fileName: string): Promise<string | undefined> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: fileName
      });

      const url = `https://${this.bucketName}.s3.${this.region}.amazonaws.com/${fileName}`;
      return url;
    } catch (error) {
      console.error('Error getting file URL:', error);
      return undefined;
    }
  }

  /** List files */
  async listFiles(): Promise<any> {
    try {
      const command = new ListObjectsV2Command({
        Bucket: this.bucketName
      });

      const response = await this.s3Client.send(command);
      return response.Contents;
    } catch (error) {
      console.error('Error listing files:', error);
      return [];
    }
  }

  /** Delete a file */
  async deleteFile(fileName: string): Promise<void> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.bucketName,
        Key: fileName
      });

      await this.s3Client.send(command);
      console.log(`File ${fileName} deleted successfully.`);
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }
}
