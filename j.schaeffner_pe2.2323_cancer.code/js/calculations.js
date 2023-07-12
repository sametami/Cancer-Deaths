// CALCULATE GENERAL DEATHS PER COUNTRY AND YEAR

function calculateGeneralDeaths() {
    // iterate over data array
    one_generaldeaths.forEach((item) => {
        const country = item.Entity;
        const year = item.Year;

        // initialize generalDeaths object for country (if it doesn't exist)
        if (!generalDeaths[country]) {
            generalDeaths[country] = {};
        }

        // calculate sum of deaths for each year
        let sum = 0;

        for (const property in item) {
            if (property.includes("Deaths") && typeof item[property] === "number") {
                sum += item[property];
            }
        }

        // assign sum to the corresdponding year in generalDeaths object
        generalDeaths[country][year] = sum;
    });

    // console.log(generalDeaths);
    // access total deaths for a specific country and year using 'generalDeaths[country][year]'
}


// CALCULATE CANCER DEATHS PER COUNTRY AND YEAR

function calculateCancerDeaths() {
    two_deathsbytype.forEach((item) => {
        const country = item.Entity;
        const year = item.Year;

        if (!cancerDeaths[country]) {
            cancerDeaths[country] = {};
        }

        let sum = 0;

        for (const property in item) {
            if (property.includes("Deaths") && typeof item[property] === "number") {
                sum += item[property];
            }
        }

        cancerDeaths[country][year] = sum;
    });

    // console.log(cancerDeaths);
}


// CALCULATE MOST COMMON CANCER TYPE PER COUNTRY AND YEAR

// Function to calculate top ten cancer types - deaths
function calculateTopTenCancerTypes(two_deathsbytype, country, year) {
    // Filter data for the specified country and year
    const filteredData = two_deathsbytype.filter(entry => entry.Entity === country && entry.Year === year);

    // Get all cancer types for the filtered data
    const cancerTypes = Object.keys(filteredData[0]).filter(key => key.startsWith("Deaths -"));

    // Sort cancer types based on the number of deaths in descending order
    const sortedCancerTypes = cancerTypes.sort((a, b) => filteredData[0][b] - filteredData[0][a]);

    // Get the top ten cancer types with the number of deaths
    const topTenCancerTypes = sortedCancerTypes.slice(0, 10).map(type => ({
        type,
        deaths: filteredData[0][type]
    }));

    // Return the top ten cancer types
    return topTenCancerTypes;
}


// Function to calculate top ten cancer types - prevalence
function calculateTopTenCancerTypes2(four_cancerbytype, country, year) {
    const filteredData2 = four_cancerbytype.filter(entry => entry.Entity === country && entry.Year === year);

    const cancerTypes2 = Object.keys(filteredData2[0]).filter(key => key.startsWith("Prevalence -") && !key.includes("Neoplasms"));
    // Neoplasms dürfen nicht mit rein, beschreibt nur alle anderen Daten zusammengerechnet 

    const sortedCancerTypes2 = cancerTypes2.sort((a, b) => filteredData2[0][b] - filteredData2[0][a]);

    const topTenCancerTypes2 = sortedCancerTypes2.slice(0, 10).map(type => ({
        type,
        deaths: filteredData2[0][type]
    }));

    // Return the top ten cancer types
    return topTenCancerTypes2;
}

function percentage() {
    five_populationwithcancer.forEach(item => {
        const key = `${item.Entity}-${item.Year}`;
        const percentage = item["Prevalence - Neoplasms - Sex: Both - Age: Age-standardized (Percent)"];
        percentages[key] = percentage;
    });

    //console.log(percentages);
}



/*function calculateTopOne () {
    let maxDeaths = 0;
    let mostCommonType = '';

    for (let i = 0; i < topTenCancerTypes.length; i++) {
        const cancerType = topTenCancerTypes[i];

        if (cancerType.deaths > maxDeaths) {
            maxDeaths = cancerType.deaths;
            mostCommonType = cancerType.type;
        }
    }

    console.log("Most Common Type of Cancer:");
    console.log(`Type: ${mostCommonType}`);
    console.log(`Deaths: ${maxDeaths}`);
}*/