let stageHeight;
let stageWidth;
let renderer;

let myDragYear;
let myYearDragging = false;

// object to store total deaths per country and year
const generalDeaths = {};
// object to store cancer deaths
const cancerDeaths = {};
// object to store most common cancer type
const mostCommon = {};

const percentages = {};

let highestPercentages;
let yearcounter = 1990;
let currentYear = 1990;

let cervicalclicked = false;
let lungclicked = false;
let stomachclicked = false;
let breastclicked = false;
let prostateclicked = false;

let currentcountry;
let heading;

const gap = 25;
const w = 90;

let changeselection = false;

// FARBEN

let lungColor = '#67C2DD';
let cervicalColor = '#DD6D2A';
let stomachColor = '#AB68C2';
let prostateColor = '#FBB072';
let breastColor = '#0178C8';
let detailColor = '#BB5C4C';


// RENDERER UND SLIDER FÜR JAHRE

$(function () {
    renderer = $('#renderer');
    stageHeight = renderer.innerHeight();
    stageWidth = renderer.innerWidth();

    calculateGeneralDeaths();
    calculateCancerDeaths();
    percentage();

    myDragYear = $(document.getElementById("myYearOne"));
    myDragYear.text(1990);

    $(myDragYear).mousedown(ev => {
        myYearDragging = true;

        $(window).on("mousemove", ev => {
            if (myYearDragging == true) {

                //console.log(ev.clientX)
                let x = ev.clientX;
                if (x < 60) {
                    x = 60;
                } else if (x > stageWidth - 60 - 80) {
                    x = stageWidth - 60 - 80;
                }
                yearcounter = gmynd.map(x, 60, stageWidth - 60 - 80, 1990, 2019);
                currentYear = Math.floor(yearcounter);
                myDragYear.text(currentYear);
                myDragYear.css({
                    left: x,
                });
                switchYear();
            }
        })
        $(window).on("mouseup", ev => {
            myYearDragging = false
        })
    })

    drawDeclaration();
    drawMap();
});




function switchYear() {
    renderer.empty();
    drawMap();
}

function drawDeclaration() {
    let switchmap = $('<div></div>');
    switchmap.html("show most common types");
    $('#renderer').append(switchmap);

    switchmap.addClass('switchmap');
    switchmap.css({
        'height': 30,
        'width': 260,
        'background-color': '#1E1E1E',
        'color': '#E9EEF2',
        'font-size': '20px',
        'position': 'absolute',
        'right': 50,
        'bottom': 80,
        'line-height': '30px',
        'text-align': 'center',
        'display': 'block',
        'border': `2px solid #E9EEF2`,
    });

    let headline = $('<div></div>');
    headline = $('<div></div>');
    headline.html("Cancer and Deaths");
    $('#renderer').append(headline);

    headline.addClass('headline');
    headline.css({
        'height': 20,
        'width': 450,
        'color': '#E9EEF2',
        'font-weight': '600',
        'font-size': '50px',
        'position': 'absolute',
        'left': 50,
        'top': 50,
        'display': 'block',
    });

    heading = $('<div></div>');
    heading.html("Proportion of cancer deaths among total deaths");
    $('#renderer').append(heading);

    heading.addClass('heading');
    heading.css({
        'height': 20,
        'width': 520,
        'color': '#E9EEF2',
        'font-size': '25px',
        'position': 'absolute',
        'left': 50,
        'top': 110,
        'display': 'block',
    });

    let title = $('<div></div>');
    title.html("Most common cause of death:");
    $('#renderer').append(title);

    title.addClass('title');
    title.css({
        'height': 20,
        'width': 290,
        'color': '#E9EEF2',
        'font-weight': '600',
        'font-size': '20px',
        'position': 'absolute',
        'left': 50,
        'bottom': 115,
        'display': 'block',
    });

    let stomachcancer = $('<div></div>');
    stomachcancer.html("Stomach cancer");
    $('#renderer').append(stomachcancer);

    stomachcancer.addClass('stomachcancer');
    stomachcancer.css({
        'height': 20,
        'width': 146,
        'color': stomachColor,
        'font-size': '20px',
        'position': 'absolute',
        'left': 364,
        'bottom': 80,
        'display': 'block',
        'text-align': 'center',
    });

    let lungcancer = $('<div></div>');
    lungcancer.html("Lung cancer");
    $('#renderer').append(lungcancer);

    lungcancer.addClass('lungcancer');
    lungcancer.css({
        'height': 20,
        'width': 110,
        'color': lungColor,
        'font-size': '20px',
        'position': 'absolute',
        'left': 50,
        'bottom': 80,
        'display': 'block',
        'text-align': 'center',
    });

    let cervicalcancer = $('<div></div>');
    cervicalcancer.html("Cervical cancer");
    $('#renderer').append(cervicalcancer);

    cervicalcancer.addClass('cervicalcancer');
    cervicalcancer.css({
        'height': 20,
        'width': 137,
        'color': cervicalColor,
        'font-size': '20px',
        'position': 'absolute',
        'left': 364 + 146 + 40,
        'bottom': 80,
        'display': 'block',
        'text-align': 'center',
    });

    let breastcancer = $('<div></div>');
    breastcancer.html("Breast cancer");
    $('#renderer').append(breastcancer);

    breastcancer.addClass('breastcancer');
    breastcancer.css({
        'height': 20,
        'width': 124,
        'color': breastColor,
        'font-size': '20px',
        'position': 'absolute',
        'left': 200,
        'bottom': 80,
        'display': 'block',
        'text-align': 'center',
    });

    let prostatecancer = $('<div></div>');
    prostatecancer.html("Prostate cancer");
    $('#renderer').append(prostatecancer);

    prostatecancer.addClass('prostatecancer');
    prostatecancer.css({
        'height': 20,
        'width': 141,
        'color': prostateColor,
        'font-size': '20px',
        'position': 'absolute',
        'left': 364 + 146 + 40 + 137 + 40,
        'bottom': 80,
        'display': 'block',
        'text-align': 'center',
    });

    if (cervicalclicked == true) {
        stomachcancer.css({
            'opacity': '15%',
        });
        lungcancer.css({
            'opacity': '15%',
        });
        cervicalcancer.css({
            'opacity': '100%',
        });
        breastcancer.css({
            'opacity': '15%',
        });
        prostatecancer.css({
            'opacity': '15%',
        });
    }

    if (lungclicked == true) {
        stomachcancer.css({
            'opacity': '15%',
        });
        cervicalcancer.css({
            'opacity': '15%',
        });
        lungcancer.css({
            'opacity': '100%',
        });
        breastcancer.css({
            'opacity': '15%',
        });
        prostatecancer.css({
            'opacity': '15%',
        });
    }

    if (stomachclicked == true) {
        lungcancer.css({
            'opacity': '15%',
        });
        cervicalcancer.css({
            'opacity': '15%',
        });
        stomachcancer.css({
            'opacity': '100%',
        });
        breastcancer.css({
            'opacity': '15%',
        });
        prostatecancer.css({
            'opacity': '15%',
        });
    }

    if (breastclicked == true) {
        lungcancer.css({
            'opacity': '15%',
        });
        cervicalcancer.css({
            'opacity': '15%',
        });
        stomachcancer.css({
            'opacity': '15%',
        });
        breastcancer.css({
            'opacity': '100%',
        });
        prostatecancer.css({
            'opacity': '15%',
        });
    }

    if (prostateclicked == true) {
        lungcancer.css({
            'opacity': '15%',
        });
        cervicalcancer.css({
            'opacity': '15%',
        });
        stomachcancer.css({
            'opacity': '15%',
        });
        breastcancer.css({
            'opacity': '15%',
        });
        prostatecancer.css({
            'opacity': '100%',
        });
    }

    $(switchmap).click(function () {
        changeselection = !changeselection;
        console.log(changeselection);
        renderer.empty();
        drawMap();
    });

    $(cervicalcancer).click(function () {
        cervicalclicked = !cervicalclicked;
        lungclicked = false;
        stomachclicked = false;
        breastclicked = false;
        prostateclicked = false;

        drawMap();
    });

    $(cervicalcancer).hover(function () {
        cervicalcancer.css({
            'background-color': '#1E1E1E',
        });
    }, function () {
        cervicalcancer.css({
            'background-color': '',
        });
    });

    $(lungcancer).click(function () {
        lungclicked = !lungclicked;
        cervicalclicked = false;
        stomachclicked = false;
        breastclicked = false;
        prostateclicked = false;

        drawMap();
    });

    $(lungcancer).hover(function () {
        lungcancer.css({
            'background-color': '#1E1E1E',
        });
    }, function () {
        lungcancer.css({
            'background-color': '',
        });
    });

    $(stomachcancer).click(function () {
        stomachclicked = !stomachclicked;
        cervicalclicked = false;
        lungclicked = false;
        breastclicked = false;
        prostateclicked = false;

        drawMap();
    });

    $(stomachcancer).hover(function () {
        stomachcancer.css({
            'background-color': '#1E1E1E',
        });
    }, function () {
        stomachcancer.css({
            'background-color': '',
        });
    });

    $(breastcancer).click(function () {
        breastclicked = !breastclicked;
        cervicalclicked = false;
        lungclicked = false;
        stomachclicked = false;
        prostateclicked = false;

        drawMap();
    });

    $(breastcancer).hover(function () {
        breastcancer.css({
            'background-color': '#1E1E1E',
        });
    }, function () {
        breastcancer.css({
            'background-color': '',
        });
    });

    $(prostatecancer).click(function () {
        prostateclicked = !prostateclicked;
        cervicalclicked = false;
        lungclicked = false;
        stomachclicked = false;
        breastclicked = false;

        drawMap();
    });

    $(prostatecancer).hover(function () {
        prostatecancer.css({
            'background-color': '#1E1E1E',
        });
    }, function () {
        prostatecancer.css({
            'background-color': '',
        });
    });

    let nodata = $('<div></div>');
    nodata.html("no percentage data");
    $('#renderer').append(nodata);

    nodata.addClass('nodata');
    nodata.css({
        'height': 25,
        'width': 250,
        'color': '#E9EEF2',
        'font-size': '25px',
        'position': 'absolute',
        'right': 50,
        'top': 50,
        'display': 'none',
        'text-align': 'center',
    });
}