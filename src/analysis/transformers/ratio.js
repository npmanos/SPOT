/**
 * @type {DataTransformer}
 * @param options.numerator {String[]} array of TeamMatchPerformance output paths OR numbers summed to become numerator of the ratio
 * @param options.denominator {String[]} array of TeamMatchPerformance output paths OR numbers summed to become denominator of the ratio
 * @param options.divByZero {Object} value to return if denominator sum is zero
 */
__TMP__
new DataTransformer("ratio", (dataset,outputPath,options) => {

    /* iterate through TeamMatchPerformances */
    for (let tmp of dataset.tmps) {
        const denominatorSum = options.denominator.reduce((acc, path) => {
            if (typeof path == "number") {
                return acc + path
            }
            return acc + getPath(tmp, path, 0)
        }, 0)

        const numeratorSum = options.numerator.reduce((acc, path) => {
            if (typeof path == "number") {
                return acc + path
            }
            return acc + getPath(tmp, path, 0)
        }, 0)

        if (denominatorSum === 0) {
            setPath(tmp, outputPath, options.divByZero)
        } else {
            setPath(tmp, outputPath, numeratorSum / denominatorSum)
        }
    }

    return dataset;
})
__/TMP__

/**
 * @type {DataTransformer}
 * @param options.numerator {String[]} array of Team output paths OR numbers summed to become numerator of the ratio
 * @param options.denominator {String[]} array of Team output paths OR numbers summed to become denominator of the ratio
 * @param options.divByZero {Object} value to return if denominator sum is zero
 */
__TEAM__
new DataTransformer("ratio", (dataset,outputPath,options) => {
    /* iterate through TeamMatchPerformances */
    for (let [teamNumber, team] of Object.entries(dataset.teams)) {
        const denominatorSum = options.denominator.reduce((acc, path) => {
            if (typeof path == "number") {
                return acc + path
            }
            return acc + getPath(team, path, 0)
        }, 0)

        const numeratorSum = options.numerator.reduce((acc, path) => {
            if (typeof path == "number") {
                return acc + path
            }
            return acc + getPath(team, path, 0)
        }, 0)

        if (denominatorSum === 0) {
            setPath(team, outputPath, options.divByZero || "N/A")
        } else {
            setPath(team, outputPath, numeratorSum / denominatorSum)
        }
    }

    return dataset;
})
__/TEAM__