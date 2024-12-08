export function keyValueTransform(toObject: string){
    return Object.entries(toObject).map(([key, value]) => ({
        key: key,
        value: value
    }));
}