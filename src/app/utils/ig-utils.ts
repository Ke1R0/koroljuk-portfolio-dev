import { Params } from '@angular/router';

export const ROUTE_PARAM_SPLITTER: string = ",";

export class ArrayUtils {
    static contains(arr: any, val: any): boolean {
        return (arr instanceof Array) && arr.indexOf(val) >= 0;
    }

    static isEmpty(arr: any): boolean {
        return !((arr instanceof Array) && !!arr.length);
    }
}

export class RouteUtils {
    static splitParamValue(params: Params): Params {
        let result = {};
        for(let param in params) {
            let val = params[param];
            if (val) {
                val = val.split(ROUTE_PARAM_SPLITTER);
            }
            result[param] = val;
        }
        return result;
    }
}