// detailed view when clicking on country

function countryClicked() {
    //console.log("I am active");
    console.log(currentcountry + " " + currentYear);
}

function drawBarChart() {
    //console.log("I bims 1 bar chart");

    // Usage example
    const country = currentcountry;
    const year = currentYear;
    const topTenCancerTypes = calculateTopTenCancerTypes(two_deathsbytype, country, year);

    countrytitle = $('<div></div>');
    countrytitle.html(country + " (" + year + ")");
    $('#renderer').append(countrytitle);

    countrytitle.addClass('countrytitle');
    countrytitle.css({
        'height': 20,
        'width': 800,
        'color': '#E9EEF2',
        'font-weight': '600',
        'font-size': '50px',
        'position': 'absolute',
        'left': 200,
        'top': 80,
        'display': 'block',
    });

    heading2 = $('<div></div>');
    heading2.html("Top ten cancer types causing deaths");
    $('#renderer').append(heading2);

    heading2.addClass('heading');
    heading2.css({
        'height': 20,
        'width': 500,
        'color': '#E9EEF2',
        'font-size': '25px',
        'position': 'absolute',
        'left': 200,
        'top': 140,
        'display': 'block',
    });
    
    
    let topOne = 0;
    let mostCommonType = '';

    for (let i = 0; i < topTenCancerTypes.length; i++) {
        const cancerType = topTenCancerTypes[i];

        if (cancerType.deaths > topOne) {
            topOne = cancerType.deaths;
            mostCommonType = cancerType.type;
        }
    }



    console.log(topOne);
    console.log("Top Ten Cancer Types:");

    for (let i = 0; i < topTenCancerTypes.length; i++) {
        const cancerType = topTenCancerTypes[i]; 
        let topten = gmynd.map(cancerType.deaths, 0, topOne, 10, 600);
        console.log(`Deaths for ${cancerType.type}: ${cancerType.deaths}`);
        console.log(topten);


        const x = 200 + i * (w + gap);
        const y = 850;

        let bar = $('<div></div>');
        $('#renderer').append(bar);
        /*let back = $('<div></div>');

        back.css({
            'height': stageHeight - h,
            'width': w,
            'background-color': 'green',
            'position': 'absolute',
            'left': x,
            'top': 0
        });*/

        bar.addClass('bar');
        bar.css({
            'height': topten,
            'width': w,
            'background-color': '#E9EEF2',
            'position': 'absolute',
            'left': x,
            'top': y-topten,
            'color': '#1E1E1E',
            'text-align': 'center',
            'padding-top': '10px',
            'display': 'block',
        });
        //$('#renderer').append(back);
        $('#renderer').append(bar);

        // Beschriftung für die einzelnen Balken
        // definitv die umständlichste Beschriftung aller Zeiten - aber es liefen jetzt halt schon alle Berechnungen auf die alten Namen
        let cancerLabelType;
        let cancerlabel = cancerType.type;
        cancerLabelType = cancerType.type;
        if (cancerLabelType.includes("Breast")) {
            cancerlabel = "Breast cancer";
        }
        if (cancerLabelType.includes("Stomach")) {
            cancerlabel = "Stomach cancer";
        }
        if (cancerLabelType.includes("Colon")) {
            cancerlabel = "Colon cancer";
        }
        if (cancerLabelType.includes("Leukemia")) {
            cancerlabel = "Leukemia";
        }
        if (cancerLabelType.includes("Bladder")) {
            cancerlabel = "Bladder cancer";
        }
        if (cancerLabelType.includes("Prostate")) {
            cancerlabel = "Prostate cancer";
        }
        if (cancerLabelType.includes("lung")) {
            cancerlabel = "Lung cancer";
        }
        if (cancerLabelType.includes("Brain")) {
            cancerlabel = "Brain cancer";
        }
        if (cancerLabelType.includes("Esophageal")) {
            cancerlabel = "Esophageal cancer";
        }
        if (cancerLabelType.includes("Pancreatic")) {
            cancerlabel = "Pancreatic cancer";
        }
        if (cancerLabelType.includes("Cervical")) {
            cancerlabel = "Cervical cancer";
        }
        if (cancerLabelType.includes("Larynx")) {
            cancerlabel = "Laryngeal cancer";
        }
        if (cancerLabelType.includes("Liver")) {
            cancerlabel = "Liver";
        }
        if (cancerLabelType.includes("Hodgkin")) {
            cancerlabel = "Non-Hodgkin lymphoma";
        }
        if (cancerLabelType.includes("Malignant")) {
            cancerlabel = "Malignant skin melanoma";
        }
        if (cancerLabelType.includes("Nasopharynx")) {
            cancerlabel = "Naso- pharyngeal cancer";
        }
        if (cancerLabelType.includes("Gallbladder")) {
            cancerlabel = "Gallbladder cancer";
        }
        if (cancerLabelType.includes("oral")) {
            cancerlabel = "Oral cavity cancer";
        }
        if (cancerLabelType.includes("Kidney")) {
            cancerlabel = "Kidney cancer";
        }
        if (cancerLabelType.includes("Ovarian")) {
            cancerlabel = "Ovarian cancer";
        }
        bar.text(cancerlabel);
    }
    }
