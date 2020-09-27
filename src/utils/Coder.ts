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

/**
 * Coder utility
 */
const CoderUtils = {

    /**
     * To base64 converter
     * @param data
     */
    toBase64(data: string): string {
        return Buffer.from(data, "utf8").toString("base64");
    },

    /**
     * From base 64 converter
     * @param data
     */
    fromBase64(data: string): string {
        return Buffer.from(data, "base64").toString("utf8");
    }

};

export const CharCodeUtils = {
    /**
     * Converts char code array (0...127) to HEX 0...FF
     * @param a
     */
    toHex(a: number[]): number{
        let ma = a;

        // Fix color missing
        if(ma.length === 1) ma = [ma[0], 0, 0];
        if(ma.length === 2) ma = [ma[0], ma[1], 0];

        const s = a.map(value => {
            let v = value.toString(16);
            v = v.padEnd(2, v);
            return v;
        }).join('');
        const hex = '0x' + s + 'FF';
        return parseInt(hex, 16);
    }

};

export const ArrayUtils = {

    /**
     * Converts base64 string to char codes array
     * @param base64String
     */
    base64ToCharCodes(base64String: string): number[] {
        const arr = [];
        for (let i = 0; i < base64String.length; i++) {
            arr.push(base64String.charCodeAt(i));
        }
        return arr;
    },

    /**
     * Converts char codes array to hex array
     * @param codes
     * @see CharCodeUtils.toHex
     */
    charCodesToHexArray(codes: number[]): number[] {
        const colors = ArrayUtils.chunk(codes, 3);
        return colors.map(CharCodeUtils.toHex);
    },

    /**
     * Returns the size from array length
     * @param a
     */
    getSizeFromLength(a: never[]){
        return Math.ceil(Math.sqrt(a.length));
    },

    /**
     * Chunks the array
     * @param a
     * @param size
     */
    chunk<T = any>(a: Array<T>, size: number): Array<Array<T>>{
        return [].concat.apply([], a.map((elem: any, i) => {
                return i % size ? [] : [a.slice(i, i + size)] as any;
            })
        );
    }

};

export default CoderUtils;