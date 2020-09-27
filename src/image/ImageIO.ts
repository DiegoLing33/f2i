/*
 * ██╗░░░░░██╗███╗░░██╗░██████╗░░░░██████╗░██╗░░░░░░█████╗░░█████╗░██╗░░██╗
 * ██║░░░░░██║████╗░██║██╔════╝░░░░██╔══██╗██║░░░░░██╔══██╗██╔══██╗██║░██╔╝
 * ██║░░░░░██║██╔██╗██║██║░░██╗░░░░██████╦╝██║░░░░░███████║██║░░╚═╝█████═╝░
 * ██║░░░░░██║██║╚████║██║░░╚██╗░░░██╔══██╗██║░░░░░██╔══██║██║░░██╗██╔═██╗░
 * ███████╗██║██║░╚███║╚██████╔╝░░░██████╦╝███████╗██║░░██║╚█████╔╝██║░╚██╗
 * ╚══════╝╚═╝╚═╝░░╚══╝░╚═════╝░░░░╚═════╝░╚══════╝╚═╝░░╚═╝░╚════╝░╚═╝░░╚═╝
 *
 * Developed by Yakov V. Panov (C) Ling • Black 2020
 * @site http://ling.black
 */

import HexArray from "../utils/Hex";
import {ArrayUtils} from "../utils/Coder";
import Jimp from "jimp";

export type ImageIOResolveImage = Jimp & {
    save(path: string): Promise<void>;
}

const ImageIO = {
    textToImage(text: string): Promise<ImageIOResolveImage> {
        const base = HexArray.fromString(text);
        const size = ArrayUtils.getSizeFromLength(base as never[]);
        const chunks = ArrayUtils.chunk(base, size);

        return new Promise<ImageIOResolveImage>((resolve, reject) => {
            new Jimp(size + 2, size + 2, function(err, image) {
                if (err) reject(err);
                else {
                    for (let i = 0; i < size; i++)
                        for (let j = 0; j < size; j++) {
                            if (chunks[i] !== undefined && chunks[i][j] !== undefined)
                                image.setPixelColor(chunks[i][j], j, i);
                        }
                    const img = Object.assign(image, {
                        save(path: string) {
                            const sp = path.endsWith('.png') ? path : `${path}.png`;
                            return new Promise((resolve1, reject1) => {
                                image.write(sp, (err) => {
                                    if (err) reject(err);
                                    else resolve();
                                });
                            });
                        }
                    }) as any;
                    resolve(img);
                }
            });
        });
    },

    imageToText(image: Jimp): string {
        const size = image.getWidth();
        const pxs = [];
        for (let i = 0; i < size; i++)
            for (let j = 0; j < size; j++) {
                let px = image.getPixelColor(j, i);
                if (px !== 0) pxs.push(px);
            }
        return HexArray.toString(pxs);
    },

    imagePathToText(path: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            Jimp.read(path, function(err, image) {
                if (err) reject(err);
                else resolve(ImageIO.imageToText(image));
            });
        })
    }
};

export default ImageIO;