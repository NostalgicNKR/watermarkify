declare module 'watermarkify' {
  export interface WatermarkifyOptions {
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

  export class WatermarkifyService {
    addWatermark(
      imageFile: File,
      options: WatermarkifyOptions
    ): Promise<string>;
  }
}
