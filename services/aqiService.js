let breakpoints = {
    oxydants: [
        {
            quantity: {
                low: 0,
                high: 53
            },
            aqi: {
                low: 0,
                high: 50
            }
        },
        {
            quantity: {
                low: 54,
                high: 100
            },
            aqi: {
                low: 51,
                high: 100
            }
        },
        {
            quantity: {
                low: 101,
                high: 360
            },
            aqi: {
                low: 101,
                high: 150
            }
        },
        {
            quantity: {
                low: 361,
                high: 649
            },
            aqi: {
                low: 151,
                high: 200
            }
        },
        {
            quantity: {
                low: 650,
                high: 1249
            },
            aqi: {
                low: 201,
                high: 300
            }
        },
        {
            quantity: {
                low: 1250,
                high: 1649
            },
            aqi: {
                low: 301,
                high: 400
            }
        },
        {
            quantity: {
                low: 1650,
                high: 2049
            },
            aqi: {
                low: 401,
                high: 500
            }
        },
    ],
    reducers: [
        {
            quantity: {
                low: 0.0,
                high: 4.4,
            },
            aqi: {
                low: 0,
                high: 50,
            }
        },
        {
            quantity: {
                low: 4.5,
                high: 9.4
            },
            aqi: {
                low: 51,
                high: 100,
            }
        },
        {
            quantity: {
                low: 9.5,
                high: 12.4
            },
            aqi: {
                low: 101,
                high: 150,
            }
        },
        {
            quantity: {
                low: 12.5,
                high: 15.4
            },
            aqi: {
                low: 151,
                high: 200,
            }
        },
        {
            quantity: {
                low: 15.5,
                high: 30.4
            },
            aqi: {
                low: 201,
                high: 300,
            }
        },
        {
            quantity: {
                low: 30.5,
                high: 40.4
            },
            aqi: {
                low: 301,
                high: 400,
            }
        },
        {
            quantity: {
                low: 40.5,
                high: 50.4
            },
            aqi: {
                low: 401,
                high: 500,
            }
        },
    ],
    pm2_5: [
        {
            quantity: {
                low: 0.0,
                high: 12.0
            },
            aqi: {
                low: 0,
                high: 50
            }
        },
        {
            quantity: {
                low: 12.1,
                high: 35.4
            },
            aqi: {
                low: 51,
                high: 100
            }
        },
        {
            quantity: {
                low: 35.5,
                high: 55.4
            },
            aqi: {
                low: 101,
                high: 150
            }
        },
        {
            quantity: {
                low: 55.5,
                high: 150.4
            },
            aqi: {
                low: 151,
                high: 200
            }
        },
        {
            quantity: {
                low: 150.5,
                high: 250.4
            },
            aqi: {
                low: 201,
                high: 300
            }
        },
        {
            quantity: {
                low: 250.5,
                high: 350.4
            },
            aqi: {
                low: 301,
                high: 400
            }
        },
        {
            quantity: {
                low: 350.5,
                high: 500.4
            },
            aqi: {
                low: 401,
                high: 500
            }
        },
    ],
    pm10: [
        {
            quantity: {
                low: 0,
                high: 54
            },
            aqi: {
                low: 0,
                high: 50
            }
        },
        {
            quantity: {
                low: 55,
                high: 154
            },
            aqi: {
                low: 51,
                high: 100
            }
        },
        {
            quantity: {
                low: 155,
                high: 254
            },
            aqi: {
                low: 101,
                high: 150
            }
        },
        {
            quantity: {
                low: 255,
                high: 354
            },
            aqi: {
                low: 151,
                high: 200
            }
        },
        {
            quantity: {
                low: 355,
                high: 424
            },
            aqi: {
                low: 201,
                high: 300
            }
        },
        {
            quantity: {
                low: 425,
                high: 504
            },
            aqi: {
                low: 301,
                high: 400
            }
        },
        {
            quantity: {
                low: 505,
                high: 604
            },
            aqi: {
                low: 401,
                high: 500
            }
        },
    ]
}

exports.calculateAqi = (polluant, polluantType) => {

    polluant = convertToProcessableData(polluant, polluantType);

    // Cette fonction est ici pour rappeler comment calculer l'aqi.
    // Elle reprend des formules trouvées dans ce document du gouvernement américain : https://www.airnow.gov/sites/default/files/2020-05/aqi-technical-assistance-document-sept2018.pdf
    // Pour ça je considère que les valeurs des différents polluants sortent du capteur, c'est à dire avec les unités suivantes :
    // - NO² : ppm
    // - CO : ppm
    // - NH3 : ppm
    // - PM1 : ug/m3
    // - PM2.5 : ug/m3
    // - PM10 : ug/m3

    let aqi = 0;

    breakpoints[polluantType].forEach(breakpoint => {
        if (breakpoint.quantity.low <= polluant && breakpoint.quantity.high >= polluant) {
            iSum = breakpoint.aqi.high - breakpoint.aqi.low;
            bpSum = breakpoint.quantity.high - breakpoint.quantity.low;
            valueMinBpLow = polluant - breakpoint.quantity.low;
            aqi = iSum / bpSum * valueMinBpLow + breakpoint.aqi.low;
        }
    });
    return parseInt(aqi);
}

exports.createFakeData = (hours) => {
    let data = []
    for (let index = 0; index < hours; index++) {
        let dummyData = {}
        for (let b in breakpoints) {
            dummyData[b] = decreasingProbability(breakpoints[b][0].quantity.low, breakpoints[b][breakpoints[b].length - 4].quantity.high, 4)
        }
        dummyData['humidity'] = getRand(40, 71)
        dummyData['pressure'] = getRand(970, 1030)
        dummyData['nh3'] = getRand(0.16, 0.84, 2)
        dummyData['light'] = getRand(3000, 4000)
        data.push(dummyData);
    }
    return data
}

function decreasingProbability(min, max, exponent) {
    if (min >= max || exponent <= 0) {
        throw new Error('Min > Max ou exponent > 0');
    }

    const random = Math.random();
    const range = max - min;
    const value = min + range * Math.pow(random, exponent);

    return parseFloat(value.toFixed(2));
}

function convertToProcessableData(polluant, polluantType) {
    switch (polluantType) {
        // case "oxydants": 
        //     polluant = parseInt(polluant * 1000);
        //     break;
        case "pm10":
            polluant = parseInt(polluant);
            break;
        case "reducers":
            polluant = parseFloat(polluant).toFixed(1);
            break;
        case "pm1":
            polluant = parseFloat(polluant).toFixed(1);
            break;
        case "pm2_5":
            polluant = parseFloat(polluant).toFixed(1);
            break;
        case "nh3":
            polluant = parseFloat(polluant).toFixed(1);
            break;
    }

    return polluant;
}

function convertToNativeData(polluant, polluantType) {
    switch (polluantType) {
        case "oxydants": 
            polluant = polluant / 1000;
            break;
        case "pm10":
            break;
        case "reducers":
            polluant = parseFloat(polluant).toFixed(1);
            break;
        case "pm1":
            polluant = parseFloat(polluant).toFixed(1);
            break;
        case "pm2_5":
            polluant = parseFloat(polluant).toFixed(1);
            break;
        case "nh3":
            polluant = parseFloat(polluant).toFixed(1);
            break;
    }

    return polluant;
}

function getRand(min, max, toFixed) {
    let rand = Math.random() * (max - min) + min;
    return rand.toFixed(toFixed)
}
