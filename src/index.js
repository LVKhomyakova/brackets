module.exports = function check(str, bracketsConfig) {
    let brackets = {sameBrackets:[]};
    for(let item of bracketsConfig){
        if(item[0] === item[1])
            brackets.sameBrackets.push(item[0]);
        else
            brackets[item[1]] = item[0];
    }

    let stack = [];
    let stackSameBrackets = [];

    for(let char of str){
        if(char in brackets){
            if(stack.length === 0) return false;
            var lastBracket = stack.pop();
            if( lastBracket !== brackets[char] ){
                if( !brackets.sameBrackets.includes(lastBracket)) return false;

                while( brackets.sameBrackets.includes(lastBracket)){
                    if(stackSameBrackets.length === 0 || stackSameBrackets[stackSameBrackets.length - 1] !== lastBracket)
                        stackSameBrackets.push(lastBracket);
                    else{
                        stackSameBrackets.pop();
                    }
                    lastBracket = stack.pop();
                }
                if(stackSameBrackets.length > 0 || lastBracket !== brackets[char]) return false;
            }           
        }
        else{
            stack.push(char);
        }
    }
    if(stack.length > 0){
        for(let item of stack){
            if(stackSameBrackets.length === 0 || stackSameBrackets[stackSameBrackets.length - 1] !== item)
                stackSameBrackets.push(item);
            else{
                stackSameBrackets.pop();
            }
        }
        if(stackSameBrackets.length > 0) return false;
    }
    return true;
}
