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

import Compose from "./Compose";
import CoderUtils, {ArrayUtils} from "./Coder";

const HexArray = {

    /**
     * Converts string to hex array
     * @param str
     */
    fromString(str: string): number[] {
        return Compose(
            CoderUtils.toBase64,
            ArrayUtils.base64ToCharCodes,
            ArrayUtils.charCodesToHexArray
        )(str);
    },

    /**
     * Converts hex array to string
     * @param array
     */
    toString(array: number[]){
        return CoderUtils.fromBase64(array.reduce((acc, v) => {
            const color =  v.toString(16);
            const r = parseInt(color.substr(0, 2), 16);
            const g = parseInt(color.substr(2, 2), 16);
            const b = parseInt(color.substr(4, 2), 16);

            return acc + String.fromCharCode(r) + String.fromCharCode(g)  + String.fromCharCode(b);
        }, ''));
    }
};

export default HexArray;