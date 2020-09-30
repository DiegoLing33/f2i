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

import ImageIO, {ImageIOResolveImage} from "./image/ImageIO";
import Jimp from "jimp";

/**
 * The F2I library path
 */
const F2I = {
    /**
     * Converts TEXT --> IMAGE
     * @param text
     */
    async textToImage(text: string): Promise<ImageIOResolveImage>{
        return ImageIO.createImage(text);
    },
    /**
     * Converts FILE --> IMAGE
     *
     * Pass file by path
     *
     * @param filePath
     */
    async filePathToImage(filePath: string): Promise<ImageIOResolveImage>{
        return ImageIO.createImageFromFile(filePath);
    },

    /**
     * Converts IMAGE --> TEXT
     * @param image
     */
    async imageToText(image: Jimp): Promise<string> {
        return ImageIO.imageToText(image);
    },

    /**
     * Converts IMAGE --> TEXT
     *
     * Pass image by file path
     *
     * @param path
     */
    async imagePathToText(path: string): Promise<string>{
        return ImageIO.imagePathToText(path);
    }
}

export default F2I;
