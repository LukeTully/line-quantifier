function getSecondsFromHRTime (hrTimeArray) {
    const NS_PER_SEC = 1e9;  
    // Expects [seconds,nanoseconds]
    if(Array.isArray(hrTimeArray)) {
        if(hrTimeArray.length == 2) {
            return hrTimeArray[0] * NS_PER_SEC + hrTimeArray[1] / 1000000000;
        }
        throw new Error("getSecondsFromHRTime can only accept a array with 2 numerical items");
    }
    throw new Error("getSecondsFromHRTime can only accept an array");
}
function parseCLIArgs (argToCheckFor,argsArray) {

    // Check each argument for a match
    // If there is a match that contains a key and value (=) return the value
    // Otherwise return true if the match is found

    for (let i = 1; i < argsArray.length; i++) {
        if (argsArray[i].indexOf(argToCheckFor) === 0) {
            if(argsArray[i].indexOf("=") != -1) {
                let argPair = argsArray[i].split("=");
                return argPair[1];
            }
            return true;
        }
    }
    return false;
}
module.exports = {
    parseCLIArgs,
    time: {
        getSecondsFromHRTime
    }
}