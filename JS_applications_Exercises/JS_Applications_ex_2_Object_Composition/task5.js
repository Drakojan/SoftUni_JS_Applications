(function solve() {
    
    String.prototype.ensureStart = function (str) {

        if (!this.startsWith(str)) {
           
            return str.concat(this);
        }
        else return this.toString();
        
    }

    String.prototype.ensureEnd = function (str) {

        if (!this.endsWith(str)) {
           
            return this.concat(str);
        }
        else return this.toString();
        
    }

    
    String.prototype.isEmpty = function () {

        if (this.length===0) {
           
            return true;
        }
        else return false;
        
    }

    String.prototype.truncate = function (n) {

        if (n<4) {
            
            let result ='';

            for (let i = 0; i < n; i++) {
                result+='.';
                
            }
            
            return result; 
        }

        if (this.length<n) {
           
            return this.toString();
        }
        else {

            let stringArr = this.split(' ');

            if (stringArr.length===1) {
                return this.slice(0,n-3).trim()+"...";
            }

            let newString = '';
            let counter = 0;

            while (newString.length<=n-3) {
                
                if (stringArr[counter] === undefined) {
                    break;
                }
                newString = newString.concat(stringArr[counter]+' ');
                counter++;
            }

            newString = newString.trim();
            
            if (newString.length>n-3) {

                if (stringArr[counter] === undefined) {
                    newString = newString.slice(0,newString.length-(stringArr[counter-1].length)-1)
                }
                else{newString = newString.slice(0,newString.length-(stringArr[counter-1].length)-1)}
                
            }

            return newString+"...";
        }
        
    }
    
    String.format = function name(string, ...params) {
       
        const regex = /{[0-9]+}/gm;
        let m;

        while ((m = regex.exec(string)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            
            // The result can be accessed through the `m`-variable.
            m.forEach((match) => {
                
                if (params.length!==0) {
                    string = string.replace(match, params.shift())
                }
                              
            });
            
        }

        return string;
    }
})();


let str = 'the quick brown fox jumps over the lazy dog';
console.log(str);
str = str.truncate(25);
console.log(str);
