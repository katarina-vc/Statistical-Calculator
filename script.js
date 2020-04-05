/*
    Author: Katarina Capalbo
    Date: 2/10/2020
    Assignment: Internet Programming Project 3
    Assignment Description: Create a Statistical Calculator web page 
*/

function calcMean(array){
    return ((calcSum(array)/array.length).toFixed(2));
}

function calcMedian(array){
    array.sort(function(a, b){return a - b});
    var mid = Math.floor(array.length/2);

    if(array.length % 2 == 0){
        return ((array[mid - 1] + array[mid]) / 2).toFixed(2);
    }else{
        return (array[mid]).toFixed(2);
    }
}

// FIXME: output = undefined
// does not need return value to two decimal places
function calcMode(array){
    var multipleNums = [];
    var modes = [];
    var testNum = array[0];
    var count;
    var max = 0;
    var duplicateFlag = false;

    for(var j = 0; j < array.length; j++){
        //reset values
        count = 0;
        testNum = array[j];
        duplicateFlag = false;

        // compare testNum against each value of the array, count++ if multiple occurrences
        for(var i = 0; i < array.length; i++){
            if(array[i] == testNum){
                count++;
            }
        }
        // check for a modal value
        if(count > 1){
            if(count > max){
                modes = [];
                modes.push(testNum);
                max = count;
            }else if(count == max){
                
                for(var i = 0; i < modes.length; i++){
                    if(testNum == modes[i]){
                        duplicateFlag = true;
                    }
                }

                if(duplicateFlag){
                    continue;
                }else{
                    modes.push(testNum);
                }  
            }
        }
    }// end outer for loop

    return modes;
}// end function

// FIXME: incorrect output nums
function calcStdDev(array){
    var variance = calcVariance(array);
    var stdDev = Math.sqrt(variance);


    return stdDev.toFixed(2);
}

function calcSum(array){
    var sum = 0;
    for(var i = 0; i < array.length; i++){
        sum += array[i];
    }
    return (sum).toFixed(2);
}

function calcVariance(array){
    var mean = calcMean(array);

    // copy array to a new array
    var tempArray = [];
    for(var i = 0;  i < array.length; i++){
        tempArray[i] = array[i];
    }

    for(var i = 0; i < tempArray.length; i++){
        tempArray[i] = Math.pow((tempArray[i] - mean), 2);
    }

    var newMean = calcMean(tempArray);

    return newMean;
}

function findMax(array){
    var max = array[0];
    for(i of array){
        if(i > max){
            max = i;
        }
    }
    return (max).toFixed(2);
}

function findMin(array){
    var min = array[0];
    for(i of array){
        if(i < min){
            min = i;
        }
    }
    return (min).toFixed(2);
}

function performStatistics(){
//Create a numeric array of the values entered in the textarea control
    var errFlag1 = false;
    var errFlag2 = false;

    var userString = document.getElementById("nums").value;
    var array = userString.split(" ");
    array = array.map(x => parseFloat(x));

    for(var i = 0; i < array.length; i++){
        // numbers entered must be between 0 and 100
      if(array[i] < 0 || array[i] > 100){
         errFlag1 = true;
      }
    }
        // user may only enter 5 to 20 numbers
    if(array.length < 5 || array.length > 20){
        errFlag2 = true;
    }


//Call each of the eight (8) functions (in some order)
//Store the value returned by each function in the value property of the respective control
if(errFlag1 == true){
    alert("Please enter numbers between 0 and 100");
    document.getElementById("form").reset();
}
if(errFlag2 == true){
    alert("Please enter only 5 to 20 numbers");
    document.getElementById("form").reset();
}

if(errFlag1 == false && errFlag2 == false){
    document.getElementById("sum").value = calcSum(array);
    document.getElementById("min").value = findMin(array);
    document.getElementById("max").value = findMax(array);
    document.getElementById("mean").value = calcMean(array);
    document.getElementById("median").value = calcMedian(array)
    document.getElementById("mode").value = calcMode(array);
    document.getElementById("stddev").value = calcStdDev(array);
    document.getElementById("variance").value = calcVariance(array);
}

return false;
}
