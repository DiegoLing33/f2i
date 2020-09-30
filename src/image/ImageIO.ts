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
import fs from "fs";

const fp = fs.promises;

export interface ImageIOSaverFunc<T = void>{
    (path: string): Promise<T>;
}

export type ImageIOResolveImage = Jimp & {
    save: ImageIOSaverFunc<Jimp>
};

const ImageIO = {

    /**
     * Creates the image
     * @param text
     */
    async createImage(text: string): Promise<ImageIOResolveImage> {
        const base   = HexArray.fromString(text);
        const size   = ArrayUtils.getSizeFromLength(base as never[]);
        const chunks = ArrayUtils.chunk(base, size);

        const image = new Jimp(size, size);

        for (let i = 0; i < size; i++)
            for (let j = 0; j < size; j++) {
                if (chunks[i] !== undefined && chunks[i][j] !== undefined)
                    image.setPixelColor(chunks[i][j], j, i);
            }

        return Object.assign(image, {
            async save(path: string) {
                const sp = path.endsWith('.png') ? path : `${path}.png`;
                return  image.writeAsync(sp);
            }
        }) as any;
    },

    /**
     * Create image from file by path
     * @param filePath
     */
    async createImageFromFile(filePath: string): Promise<ImageIOResolveImage>{
        const content = await fp.readFile(filePath);
        const contentString = String(content);
        return await ImageIO.createImage(contentString);
    },

    textToImage(text: string): Promise<ImageIOResolveImage> {
        return ImageIO.createImage(text);
    },

    imageToText(image: Jimp): string {
        const size = image.getWidth();
        const pxs  = [];
        for (let i = 0; i < size; i++)
            for (let j = 0; j < size; j++) {
                let px = image.getPixelColor(j, i);
                if (px !== 0) pxs.push(px);
            }
        return HexArray.toString(pxs);
    },

    /**
     * Image path to text
     * @param path
     */
    async imagePathToText(path: string): Promise<string> {
        const sp = path.endsWith('.png') ? path : `${path}.png`;
        const image = await Jimp.read(sp);
        return ImageIO.imageToText(image);
    }
};

export default ImageIO;
