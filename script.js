let ans = ""; // store column data

let n = 1;

while(n > 0){
    let rem = n % 26;
    if(rem==0){
        ans = 'z'+ans;
        n = Math.floor(n/26)-1;
    }
    else
    {
        ans = String.fromCharCode(rem-1+65)+ans;
        n = Math.floor(n/26);
    }
}

console.log(ans);