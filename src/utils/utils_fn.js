export default {
    parseSearchStr(str){
        const reg=/[^?&=]+/gim;
        const arr=str.match(reg);
        const result={};
        if(!arr){
            return result;
        }else {
            if (arr.length > 0) {
                arr.forEach((item, index) => {
                    if (index % 2 === 0) {
                        result[arr[index]] = arr[index + 1]
                    }
                })
            }
        }
        return result;
    }
}