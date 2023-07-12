// Karte

function drawMap() {
    renderer.empty();
    drawDeclaration();

    positiondata.forEach(country => {

        let land = country.country;

        const year = currentYear;
        const topTenCancerTypes = calculateTopTenCancerTypes(two_deathsbytype, land, year);
        const topTenCancerTypes2 = calculateTopTenCancerTypes2(four_cancerbytype, land, year);



        const key = `${land}-${year}`;
        const prozent = percentages[key];
        console.log(prozent);

        // console.log(land);
        // console.log(topTenCancerTypes2[0]);
        // das maxType ausrechnen hätte man sich eigentlich auch bei der ersten Karte schon sparen können; ist ja automatisch die Zahl an erster Stelle im Top Ten Array...

        const x = gmynd.map(country.longitude, -180, 180, -100, stageWidth - 100);
        const y = gmynd.map(country.latitude, 90, -90, 5, stageHeight);
        let farbgebung = '#1E1E1E'; // category: "other"



        if (changeselection == true) {
            let mostCommon = topTenCancerTypes2[0].type;

            if (mostCommon.includes("Prostate")) {
                farbgebung = prostateColor;
            }
            if (mostCommon.includes("Breast")) {
                farbgebung = breastColor;
            }
            if (mostCommon.includes("Cervical")) {
                farbgebung = cervicalColor;
            }

            let opacity;
            if (farbgebung != cervicalColor && cervicalclicked == true) {
                opacity = '15%';
            }

            if (farbgebung != lungColor && lungclicked == true) {
                opacity = '15%';
            }

            if (farbgebung != stomachColor && stomachclicked == true) {
                opacity = '15%';
            }

            if (farbgebung != breastColor && breastclicked == true) {
                opacity = '15%';
            }

            if (farbgebung != prostateColor && prostateclicked == true) {
                opacity = '15%';
            }


            $('.title').html("Most common cancer type:");
            $('.heading').html("Share of population affected by cancer");
            $('.switchmap').html("show proportion of deaths");


            if (currentYear < 2018) {
                let fläche = gmynd.map(prozent, 0, 5.5, 0, 1500);
                radius = 2 * (Math.sqrt(fläche / Math.PI));
            } else {
                radius = 10;

                $('.nodata').css({
                    'display': 'block',
                });
            }

            let percentagedot2 = $('<div></div');
            percentagedot2.addClass('percentagedot2');
            percentagedot2.css({
                'height': radius,
                'width': radius,
                'background-color': farbgebung,
                'position': 'absolute',
                'left': x,
                'top': y,
                'border-radius': '50%',
                'opacity': opacity,
                'display': 'block',
            });
            renderer.append(percentagedot2);

            if (currentYear < 2018) {
                $(percentagedot2).hover(function () {
                    hoverlabel2 = $('<div></div>');
                    hoverlabel2.html(country.country + "<br>" + " " + "<br>" + prozent + "%");
                    $('#renderer').append(hoverlabel2);

                    hoverlabel2.css({
                        'right': 50,
                        'top': 50,
                        'position': 'absolute',
                        'color': '#E9EEF2',
                        'font-size': '20px',
                        'display:': 'block',
                        'background-color': '#1E1E1E',
                        'padding': '10px',
                        'border-radius': '10px',
                        'white-space': 'nowrap'
                    });
                }, function () {
                    hoverlabel2.css({
                        'display': 'none',
                    });
                });
            }
        }




        if (changeselection == false) {
            let maxDeaths = 0;
            let mostCommonType = '';

            for (let i = 0; i < topTenCancerTypes.length; i++) {
                const cancerType = topTenCancerTypes[i];

                if (cancerType.deaths > maxDeaths) {
                    maxDeaths = cancerType.deaths;
                    mostCommonType = cancerType.type;
                }
            }

            /*console.log("Most Common Type of Cancer:");
            console.log(`Type: ${mostCommonType}`);
            console.log(`Deaths: ${maxDeaths}`);*/


            if (mostCommonType.includes("Stomach")) {
                farbgebung = stomachColor;
            }
            if (mostCommonType.includes("Tracheal")) {
                farbgebung = lungColor;
            }
            if (mostCommonType.includes("Cervical")) {
                farbgebung = cervicalColor;
            }
            if (mostCommonType.includes("Prostate")) {
                farbgebung = prostateColor;
            }
            if (mostCommonType.includes("Breast")) {
                farbgebung = breastColor;
            }


            let alldeaths = generalDeaths[country.country][currentYear] + cancerDeaths[country.country][currentYear];
            let cancerdeaths = cancerDeaths[country.country][currentYear];
            let percentage = (cancerdeaths / alldeaths) * 100;

            /*console.log (country.country + ": " + alldeaths);
            console.log(country.country + ": " + cancerdeaths);
            console.log(percentage + "%");*/

            let rpcalc = gmynd.map(percentage, 0, 100, 0, 2000);
            let rp = 2 * (Math.sqrt(rpcalc / Math.PI));

            let r1calc = gmynd.map(alldeaths, 0, 11490475, 10, 50000);
            let r1 = 2 * (Math.sqrt(r1calc / Math.PI));
            let r2calc = gmynd.map(cancerdeaths, 0, 11490475, 10, 50000);
            let r2 = 2 * (Math.sqrt(r2calc / Math.PI));





            let opacity;
            if (farbgebung != cervicalColor && cervicalclicked == true) {
                opacity = '15%';
            }

            if (farbgebung != lungColor && lungclicked == true) {
                opacity = '15%';
            }

            if (farbgebung != stomachColor && stomachclicked == true) {
                opacity = '15%';
            }

            if (farbgebung != breastColor && breastclicked == true) {
                opacity = '15%';
            }

            if (farbgebung != prostateColor && prostateclicked == true) {
                opacity = '15%';
            }


            /* neu (und deutlich einfacher als das, was ich zuerst gebastelt hatte:
            percentagedot ändert, wenn die Maus drüber ist, seine Größe so, dass die
            Größe = cancerdeaths ist und bekommt ne outline, die den generaldeaths entspricht...
            so arbeite ich mit nur einem Punkt, statt mit drei verschiedenen, was alles
            deutlich weniger kompliziert macht xD */


            let percentagedot = $('<div></div');
            percentagedot.addClass('percentagedot');
            percentagedot.css({
                'height': rp,
                'width': rp,
                'background-color': farbgebung,
                'position': 'absolute',
                'left': x,
                'top': y,
                'border-radius': '50%',
                'opacity': opacity,
                'display': 'block',
            });

            $(percentagedot).mouseenter(function () {

                let left = x + (rp - r1) / 2
                let top = y + (rp - r1) / 2
                const border = (r1 - r2) / 2
                percentagedot.css({
                    'height': r1,
                    'width': r1,
                    'left': left,
                    'top': top,
                    'background-color': detailColor,
                    'border': `${border}px solid #949494`
                });

                hoverlabel = $('<div></div>');
                hoverlabel.html(country.country + "<br>" + " " + "<br>" + cancerdeaths + " cancer deaths" + "<br>" + alldeaths + " deaths");
                $('#renderer').append(hoverlabel);

                hoverlabel.css({
                    'right': 50,
                    'top': 50,
                    'position': 'absolute',
                    'color': '#E9EEF2',
                    'font-size': '20px',
                    'display:': 'block',
                    'background-color': '#1E1E1E',
                    'padding': '10px',
                    'border-radius': '10px',
                    'white-space': 'nowrap'
                });

            });

            $(percentagedot).mouseleave(function () {

                percentagedot.css({
                    'height': rp,
                    'width': rp,
                    'left': x,
                    'top': y,
                    'border': `none`,
                    'background-color': farbgebung,
                });

                hoverlabel.css({
                    'display': 'none',
                });
            });





            $(percentagedot).click(function () {
                //console.log("click on " + country.country);
                currentcountry = country.country;
                //console.log(currentcountry);
                percentagedot.hide();

                //$('.percentagedot').not(this).hide();

                const lineElement = document.getElementById('line');
                lineElement.style.display = 'none';
                const yearThingy = document.getElementById('myYearOne');
                yearThingy.style.display = 'none';

                $('.heading').css({
                    'display': 'none',
                });
                $('.headline').css({
                    'display': 'none',
                });
                $('.title').css({
                    'display': 'none',
                });
                $('.stomachcancer').css({
                    'display': 'none',
                });
                $('.lungcancer').css({
                    'display': 'none',
                });
                $('.cervicalcancer').css({
                    'display': 'none',
                });
                $('.breastcancer').css({
                    'display': 'none',
                });
                $('.prostatecancer').css({
                    'display': 'none',
                });
                $('.switchmap').css({
                    'display': 'none',
                });


                countryClicked();

                // neuen gelben Punkt drüberzeichen und alten Punkt hiden, damit Animation über allen anderen Ländern liegt

                let detaildot = $('<div></div');
                detaildot.addClass('detaildot');
                detaildot.css({
                    'height': r2,
                    'width': r2,
                    'left': x + (rp - r2) / 2,
                    'top': y + (rp - r2) / 2,
                    'background-color': detailColor,
                    'border-radius': '50%',
                    'display': 'block',
                    'position': 'absolute',
                });


                $(detaildot).animate({
                    'height': 1600,
                    'width': 1600,
                    'left': stageWidth / 2 - 800,
                    'top': stageHeight / 2 - 800,
                    'background-color': detailColor,
                    'position': 'absolute',
                    'border-radius': '50%',
                    'display': 'block',
                }, 1000, function () {
                    //console.log("DONE");
                    drawBarChart();

                    let close = $('<div></div');
                    close.html("close");
                    close.addClass('close');
                    close.css({
                        'height': 60,
                        'width': 60,
                        'background-color': '#E9EEF2',
                        'color': detailColor,
                        'font-size': '20px',
                        'position': 'absolute',
                        'right': 211,
                        'top': 80,
                        'line-height': '60px',
                        'text-align': 'center',
                        'display': 'block',
                        'border-radius': '50%',
                        //'border': `2px solid #1E1E1E`,
                    });
                    renderer.append(close);

                    $('.heading').css({
                        'display': 'block',
                    });
                    heading.html(" ");

                    $(close).click(function () {
                        //console.log("CLOSE");
                        $(detaildot).animate({
                            'height': rp,
                            'width': rp,
                            'left': x,
                            'top': y,
                            'background-color': detailColor,
                            'position': 'absolute',
                            'border-radius': '50%',
                            'display': 'block',
                        }, 1000, function () {
                            //console.log("DONE");
                            detaildot.css({
                                'display': 'none',
                            });
                            lineElement.style.display = 'block';
                            yearThingy.style.display = 'block';
                            percentagedot.show();
                            heading.html("Proportion of cancer deaths among total deaths");
                            $('.title').css({
                                'display': 'block',
                            });
                            $('.stomachcancer').css({
                                'display': 'block',
                            });
                            $('.lungcancer').css({
                                'display': 'block',
                            });
                            $('.cervicalcancer').css({
                                'display': 'block',
                            });
                            $('.breastcancer').css({
                                'display': 'block',
                            });
                            $('.prostatecancer').css({
                                'display': 'block',
                            });
                            $('.switchmap').css({
                                'display': 'block',
                            });
                            $('.headline').css({
                                'display': 'block',
                            });
                        });

                        close.css({
                            'display': 'none'
                        });
                        $('.bar').css({
                            'display': 'none',
                        });
                        $('.countrytitle').css({
                            'display': 'none',
                        });
                        $('.countrytitle').css({
                            'display': 'none',
                        });
                        heading2.html(" ");
                    });
                });

                renderer.append(detaildot);
            });


            renderer.append(percentagedot);
        }
    });
}