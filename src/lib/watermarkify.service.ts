import { Injectable } from '@angular/core';
interface WatermarkifyOptions {
  watermarkText: string;
  textColor?: string;
  fontSize?: number;
  fontWeight?: string | number;
  fontOpacity?: number;
  fontFamily?: string;
  fontStyle?: 'normal' | 'italic' | 'oblique' | 'initial' | 'inherit';
  backgroundColor?: string;
  backgroundOpacity?: number;
  watermarkPosition?: 'leftBottom' | 'rightBottom';
  horizontalOffset?: number;
  verticalOffset?: number;
}

@Injectable({
  providedIn: 'root',
})
export class WatermarkifyService {
  constructor() {}

  addWatermark(imageFile: File, options: WatermarkifyOptions): Promise<string> {
    const {
      watermarkText,
      textColor = 'white',
      fontSize = 50,
      fontWeight = 'normal',
      fontOpacity = 1.0,
      fontFamily = 'Arial',
      fontStyle = 'normal',
      backgroundColor = 'rgba(0, 0, 0, 0.5)',
      backgroundOpacity = 0.5,
      watermarkPosition = 'leftBottom',
      horizontalOffset = 0,
      verticalOffset = 0,
    } = options;

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const watermarkedImage = this.processImage(
          img,
          watermarkText,
          textColor,
          fontSize,
          fontWeight,
          fontOpacity,
          fontFamily,
          fontStyle,
          backgroundColor,
          backgroundOpacity,
          watermarkPosition,
          horizontalOffset,
          verticalOffset
        );

        const watermarkedImageUrl = watermarkedImage.toDataURL('image/jpeg');
        resolve(watermarkedImageUrl);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = URL.createObjectURL(imageFile);
    });
  }

  private processImage(
    originalImage: HTMLImageElement,
    watermarkText: string,
    textColor: string,
    fontSize: number,
    fontWeight: string | number,
    fontOpacity: number,
    fontFamily: string,
    fontStyle: string,
    backgroundColor: string,
    backgroundOpacity: number,
    position: 'leftBottom' | 'rightBottom',
    horizontalOffset: number,
    verticalOffset: number
  ): HTMLCanvasElement {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    canvas.width = originalImage.width;
    canvas.height = originalImage.height;

    ctx.drawImage(originalImage, 0, 0);

    const lines = watermarkText.split('\n');
    const lineHeight = fontSize + 4;
    const maxLineWidth = this.calculateMaxLineWidth(ctx, lines, fontSize);

    const backgroundX =
      position === 'rightBottom'
        ? canvas.width - maxLineWidth - horizontalOffset
        : horizontalOffset;

    const backgroundY =
      canvas.height - lines.length * lineHeight - verticalOffset;

    // Draw background
    ctx.globalAlpha = backgroundOpacity;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(
      backgroundX,
      backgroundY,
      maxLineWidth + 10,
      lines.length * lineHeight + 10
    );

    // Draw text lines
    ctx.globalAlpha = fontOpacity;
    ctx.fillStyle = textColor;
    ctx.font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;

    for (let i = 0; i < lines.length; i++) {
      const textY = backgroundY + (i + 1) * lineHeight - 2;
      const textX =
        position === 'rightBottom' ? backgroundX + 5 : backgroundX + 5;
      ctx.fillText(lines[i], textX, textY);
    }

    return canvas;
  }

  private calculateMaxLineWidth(
    ctx: CanvasRenderingContext2D,
    lines: string[],
    fontSize: number
  ): number {
    let maxLineWidth = 0;
    ctx.font = `${fontSize}px Arial`;

    for (const line of lines) {
      const lineWidth = ctx.measureText(line).width;
      if (lineWidth > maxLineWidth) {
        maxLineWidth = lineWidth;
      }
    }

    return maxLineWidth;
  }
}
