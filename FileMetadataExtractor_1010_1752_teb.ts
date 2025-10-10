// 代码生成时间: 2025-10-10 17:52:53
import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FileMetadataExtractor {

    constructor(private sanitizer: DomSanitizer) {}

    /**
     * Extract metadata from a File object.
     * @param file The file to extract metadata from.
     * @returns An Observable containing the extracted metadata.
     */
    extractMetadata(file: File): Observable<any> {
        if (!(file instanceof File)) {
            return throwError(() => new Error('Invalid file provided.'));
        }

        // Check if the file is an image
        if (file.type.startsWith('image/')) {
            return this.extractImageMetadata(file);
        }
        
        // Check if the file is a video
        if (file.type.startsWith('video/')) {
            return this.extractVideoMetadata(file);
        }
        
        // For other file types, return generic metadata
        return this.getGenericMetadata(file);    
    }

    private extractImageMetadata(file: File): Observable<any> {
        const imageUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
        return new Observable(observer => {
            const image = new Image();
            image.onload = () => {
                const metadata = {
                    width: image.width,
                    height: image.height,
                    type: file.type
                };
                observer.next(metadata);
                observer.complete();
            };
            image.onerror = (error) => {
                observer.error(new Error('Failed to load image'));
            };
            image.src = imageUrl;
        });
    }

    private extractVideoMetadata(file: File): Observable<any> {
        return new Observable(observer => {
            const video = document.createElement('video');
            const url = URL.createObjectURL(file);
            video.src = url;
            video.onloadedmetadata = () => {
                const metadata = {
                    width: video.videoWidth,
                    height: video.videoHeight,
                    duration: video.duration,
                    type: file.type
                };
                observer.next(metadata);
                observer.complete();
            };
            video.onerror = (error) => {
                observer.error(new Error('Failed to load video'));
            };
        });
    }

    private getGenericMetadata(file: File): Observable<any> {
        return of({
            name: file.name,
            size: file.size,
            type: file.type
        });
    }
}
