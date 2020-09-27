# F2I 0.1.5 &middot; [![GitHub license](https://img.shields.io/badge/license-Apache_2.0-green.svg)](https://github.com/DiegoLing33/f2i/blob/master/LICENSE) [![npm version](https://img.shields.io/npm/v/f2i.svg?style=flat)](https://www.npmjs.com/package/f2i)
<img style="height: 100px" src="https://github.com/DiegoLing33/f2i/blob/master/resources/logo.png?raw=true" alt="logo" />

File to image utility

---
## Idea
Right now (version 0.1.0) you can only converts text to image and back again, but application contains the very simple algorithm
that allows encoding files in the future. I want to realize the system like "Path to Image", what about store and share your 
projects in images? Sounds interesting. Ok go...

## How to use?
### Installation:
Do installation **only** global
 
`yarn global add f2i`

### Encode and decode
Run `f2i` in the terminal and use UI application. Cli version right now in progress.

---

## API

You can import library to create your own projects. Just import 
```javascript
import ImageIO from "f2i/dist/image/ImageIO";
```
(*Maybe right now it doesn't seem pretty, but it works fine*)

### Text -> Image
```javascript
ImageIO.textToImage( text ).then( image => image.write( path ));
```

- Param `text` - this is the text to encode
- Param `path` - this is the path where image will be saved

### Image -> Text
```javascript
ImageIO.imagePathToText( path ).then(text => console.log(text));
```

- Param `path` - this is the path to your `png` image file

This function returns the `Promis<string>`.

---
UI Screen

<img style="width: 100%" src="https://github.com/DiegoLing33/f2i/blob/master/resources/image.png?raw=true" alt="screen" />

- Save image - Saves image as file (with your  text)
- Load image - Loads image and decode the text from it

(*PS: Image seems not good in the application, it's cuz of the small size of the image*)
