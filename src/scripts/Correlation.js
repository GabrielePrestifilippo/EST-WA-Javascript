define([], function () {

    var Correlation = function () {

    };
    /**
     * Calculate the correlation between two datasets
     * @param resolve: function to execute when finished
     * @param timeData: all the data sorted by time
     * @param config: configuration options for the data
     */
    Correlation.getCorrelationDatasets = function (resolve, timeData, config) {

        var first = [];
        var second = [];
        var sum0 = 0;
        var sum1 = 0;

        var x, y, id, val;
        if (config[1]) {
            for (x in timeData) {
                if (timeData[x][0] && timeData[x][1]) {
                    var length = Math.min(timeData[x][0].length, timeData[x][1].length);
                    for (y = 0; y < length; y++) {
                        id = timeData[x][0][y][0];

                        if (config[0].separator) {
                            val = Number(timeData[x][0][y][1].split(config[0].separator).join(""));
                        } else {
                            val = Number(timeData[x][0][y][1]);
                        }
                        sum0 += val;

                        id = timeData[x][1][y][0];

                        if (config[0].separator) {
                            val = Number(timeData[x][1][y][1].split(config[1].separator).join(""));
                        } else {
                            val = Number(timeData[x][1][y][1]);
                        }
                        sum1 += val;
                    }

                    first.push(sum0 / timeData[x][0].length);
                    second.push(sum1 / timeData[x][1].length);
                }
            }
        } else {
            for (x in timeData) {

                for (y = 0; y < timeData[x][0].length; y++) {
                    id = timeData[x][0][y][0];
                    if (timeData[x][0][y].length < 3) {
                        return;
                    }
                    if (config[0].separator) {
                        val = Number(timeData[x][0][y][1].split(config[0].separator).join(""));
                    } else {
                        val = Number(timeData[x][0][y][1]);
                    }
                    sum0 += val;
                    if (config[0].separator) {
                        val = Number(timeData[x][0][y][2].split(config[0].separator).join(""));
                    } else {
                        val = Number(timeData[x][0][y][2]);
                    }
                    sum1 += val;
                }

                first.push(sum0 / timeData[x][0].length);
                second.push(sum1 / timeData[x][0].length);
            }
        }
        var corr = [first, second];
        var correlation = this.correlation(corr, 0, 1);
        resolve(correlation);
    };

    /**
     * Calculate the correlation between two variables in a dataset
     * @param configuration: name and id of the variables
     * @param timeData: all the data sorted by time
     * @param config: configuration options for the data
     * @param lengthData: length of the dataset to analyze
     * @returns {*[]}
     */
    Correlation.getCorrelationVariables = function (configuration, timeData, config, lengthData) {

        var id = configuration.id;
        var names = configuration.names;
        var arrayCorrelation = [names];

        var x, y, z, entry, entryArray, entryData;
        for (x in timeData) {
            var specTime = timeData[x];
            if (!config[1]) {
                for (y in specTime[0]) {
                    if (specTime[0][y][0] == id) {
                        entry = [];
                        entryArray = [x];

                        for (var h = 1; h < lengthData+1; h++) {
                            entryData = specTime[0][y][h];
                            if (config[0].separator) {
                                entryData = Number(entryData.split(config[0].separator).join(""));
                            }
                            entryArray.push(Number(entryData));
                        }
                        arrayCorrelation.push(entryArray);
                    }
                }
            } else {
                if (specTime[0] && specTime[1]) {
                    for (y in specTime[0]) {
                        if (specTime[0][y][0] == id) {
                            entry = [];
                            entryArray = [x];
                            entryData = specTime[0][y][1];
                            if (config[0].separator) {
                                entryData = Number(entryData.split(config[0].separator).join(""));
                            }
                            entryArray.push(Number(entryData));
                            for (z in specTime[1]) {
                                if (specTime[1][z][config[1].id] == id) {
                                    entryData = specTime[1][y][config[1].data[0]];
                                    if (config[1].separator) {
                                        entryData = Number(entryData.split(config[1].separator).join(""));
                                    }
                                }
                            }
                            entryArray.push(entryData);
                            arrayCorrelation.push(entryArray);
                        }
                    }
                }
            }
        }
        return arrayCorrelation;
    };

    /**
     * Fucntion to calculate the correlation betweetn two variables
     * @param prefs: array containing the two array of values
     * @param p1: first array of values
     * @param p2: second array of values
     * @returns {number}: returns the correlation between the two array
     */
    Correlation.correlation = function (prefs, p1, p2) {

        var si = [];

        for (var key in prefs[p1]) {
            if (prefs[p2][key]) si.push(key);
        }

        var n = si.length;

        if (n === 0) return 0;

        var sum1 = 0;
        var i;
        for (i = 0; i < si.length; i++) sum1 += prefs[p1][si[i]];

        var sum2 = 0;
        for (i = 0; i < si.length; i++) sum2 += prefs[p2][si[i]];

        var sum1Sq = 0;
        for (i = 0; i < si.length; i++) {
            sum1Sq += Math.pow(prefs[p1][si[i]], 2);
        }

        var sum2Sq = 0;
        for (i = 0; i < si.length; i++) {
            sum2Sq += Math.pow(prefs[p2][si[i]], 2);
        }

        var pSum = 0;
        for (i = 0; i < si.length; i++) {
            pSum += prefs[p1][si[i]] * prefs[p2][si[i]];
        }

        var num = pSum - (sum1 * sum2 / n);
        var den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
            (sum2Sq - Math.pow(sum2, 2) / n));

        if (den === 0) return 0;

        return num / den;

    };
 
    return Correlation;
});