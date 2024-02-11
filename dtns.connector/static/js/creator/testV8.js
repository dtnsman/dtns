let sum = 0;
let begin = new Date().getTime()
for(let i =0 ;i<1000000000;i++)
{
    sum+= i+ Math.random()
}
console.log('sum：'+sum)
console.log('used-time:'+(new Date().getTime() - begin))
/*//node.js---test
sum：499999999999993300
used-time:7020
*/