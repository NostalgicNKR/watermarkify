# Watermarkify

Watermarkify is a powerful Angular library that enables you to easily add watermarks to images. Whether you're building a photo gallery, an image processing application, or any other project that requires watermarking, Watermarkify has you covered. With customizable options for watermark text, font styles, colors, and positioning, you can create stunning watermarked images with just a few lines of code.

## Features

- Add text watermarks to images with various customizable options.
- Choose watermark text, font size, font color, font weight, opacity, and background color.
- Position the watermark at the left or right bottom corner of the image.
- Apply horizontal and vertical offsets to fine-tune watermark placement.
- Compatible with Angular applications.

## Installation

To install Watermarkify, use npm:

```bash
npm install watermarkify
```

Once the package is installed, you can import the library using import approach:
```bash
import { WatermarkifyService } from "watermarkify";
```

Then make sure you Inject the WatermarkifyService into your component or service:

```bash
constructor(private watermarkService: WatermarkifyService) {}
```

## Usage

The watermarkService has a method called addWatermark with signature:


<b>addWatermark(imageFile: File, options: WatermarkifyOptions): Promise<string></b>


The addWatermark takes two arguments, the first one is a image which must be of type File and second argument is options object in which 'watermarkText' is a required field and rest are optional and this method returns a Promise which contains string (image url) or error. Look at example below:

```bash
this.watermarkService.addWatermark(imageFile, { watermarkText: 'Watermark text goes here' })
    .then((watermarkedImageUrl: string) => {
      console.log('Watermarked image URL:', watermarkedImageUrl); //assign this to img src attribute to display image
    })
    .catch((error: any) => {
      console.error('Error adding watermark:', error);
    });
```

Set of options supported:

```bash
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
    horizontalOffset?: number;  //use this option to move the watermark horizontally
    verticalOffset?: number; //use this option to move the watermark vertically
  }
```
