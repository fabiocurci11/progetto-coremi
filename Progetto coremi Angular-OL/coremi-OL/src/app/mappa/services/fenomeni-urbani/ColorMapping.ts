export class ColorMapping {

    static valueColorDict = new Map([
        [1, 'marrone'],
        [2, 'marrone'],
        [3, 'rosso'],
        [4, 'rosso'],
        [5, 'arancione'],
        [6, 'arancione'],
        [7, 'giallo'],
        [8, 'giallo'],
        [9, 'verde'],
        [10, 'verde'],
    ]);

    static mapValueToColor(value: number): string{
       return this.valueColorDict.get(value)!;
    }
}