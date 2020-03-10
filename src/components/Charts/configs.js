import { cloneDeep } from 'lodash';

// Data

let data = [
    {"date" : "2017-09-1", "value": 40, "module": 0},
    {"date" : "2017-09-2", "value": 10, "module": 1},
    {"date" : "2017-09-3", "value": 78, "module": 2},
    {"date" : "2017-09-4", "value": 73, "module": 3},
    {"date" : "2017-09-5", "value": 20, "module": 4},
    {"date" : "2017-09-6", "value": 67, "module": 5},
    {"date" : "2017-09-7", "value": 65, "module": 6}
]



let barData = [
    {
      "date": "2020-01-20",
      "value": 16
    },
    {
      "date": "2020-01-21",
      "value": 80
    },
    {
      "date": "2020-01-22",
      "value": 1
    },
    {
      "date": "2020-01-23",
      "value": 98
    },
    {
      "date": "2020-01-24",
      "value": 98
    },
    {
      "date": "2020-01-25",
      "value": 5
    },
    {
      "date": "2020-01-26",
      "value": 5
    },
    {
      "date": "2020-01-27",
      "value": 59
    },
    {
      "date": "2020-01-28",
      "value": 96
    },
    {
      "date": "2020-01-29",
      "value": 53
    }
]



const gaugeConfig = {
    data: {
        value: parseInt(Math.random() * 100)
    },
    config: {
        size: 120,
        label: 'Memory', //The name that appears in the center of the gauge
        min: 0,
        max: 100,
        outerDialColor: '#ccc',
        innerDialColor: '#fff'
    }
}



const createTimeSeriesData = () => {
    // console.log('Inside timeSeriesData');
    let newData = [];
    for(let i=0; i<10; i++) {
        let obj = {};
        let tempDate = new Date().getTime() + i * 86400000;
        let date = new Date(tempDate);
        let finalDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        obj.date = finalDate;
        obj.value = parseInt(Math.random() * 100); 
        newData.push(obj);   
    }
    return newData;
}



const createStackedData = () => {
    let newData = [];
    for(let i=0; i<10; i++) {
        let obj = {};
        let tempDate = new Date().getTime() + i * 86400000;
        let date = new Date(tempDate);
        let finalDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        obj.date = finalDate;
        obj.value1 = parseInt(Math.random() * 100); 
        obj.value2 = parseInt(Math.random() * 100);
        // obj.value3 = parseInt(Math.random() * 100);
        newData.push(obj); 
    }
    return newData;
}



const createMinuteData = () => {
    let newData = [];
    for(let i=0; i<10; i++) {
        let obj = {};
        let tempDate = new Date().getTime() + i * 1000;
        let date = new Date(tempDate);
        let finalDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() +  ':' + date.getSeconds();
        obj.date = finalDate;
        obj.value = parseInt(Math.random() * 100); 
        newData.push(obj);  
    }
    return newData;
}



const createTSMixedData = () => {
    let newData = [];
    for(let i=0; i<10; i++) {
        let obj = {};
        let tempDate = new Date().getTime() + i * 86400000;
        let date = new Date(tempDate);
        let finalDate = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate();
        obj.date = finalDate;
        obj.value = i%2===0 ? parseInt(Math.random() * 100) : -parseInt(Math.random() * 100); 
        newData.push(obj);   
    }
    return newData;
}



const createScatterData = () => {
    let newData = [];
    for(let i=0; i<100; i++) {
        let obj = {};
        let x = Math.floor(Math.random() * Math.random() * 10) + Math.random() * 10;
        let y = Math.floor(Math.random() * Math.random()* 10) + Math.random() * 10;
        obj.x = Math.round(x);
        obj.y = Math.round(y); 
        obj.label = "Label-" + (i+1);
        newData.push(obj);   
    }
    return newData;
}



export const addDataPoint = (chart_id, old_data, new_point) => {
    let new_data = cloneDeep(old_data).slice(1);
    new_data.push(new_point);
    return new_data;
}



/* !!!!!!!!!!!!!!!!!!-------------------------------------------------------!!!!!!!!!!!!!!!!!!!!!!!!!! */



// Configs


export const fetchBarConfig = () => {
    // let newData = createTimeSeriesData();
    let newData = JSON.parse(JSON.stringify(barData));
    
    let config = {};
    config.config = {
        margin: {top: 20, right: 20, bottom: 70, left: 40},
        miniMargin: {top: 10, right: 40, bottom: 70, left: 50},
        height: 300,
        width: 500,
        fill: 'purple'
    }
    config.data = newData;
    return config;
}



export const fetchNegativeBarConfig = () => {
    let newData = JSON.parse(JSON.stringify(createTSMixedData()));
    
    let config = {};
    config.config = {
        margin: {top: 20, right: 20, bottom: 70, left: 40},
        miniMargin: {top: 10, right: 40, bottom: 70, left: 50},
        height: 300,
        width: 500,
        fill: 'purple'
    }
    config.data = newData;
    return config;
}



export const fetchBarRealTimeConfig = () => {
    let newData = createMinuteData();
    // let newData = createTSMixedData();
    
    let config = {};
    config.config = {
        margin: {top: 20, right: 20, bottom: 70, left: 40},
        miniMargin: {top: 10, right: 40, bottom: 70, left: 50},
        height: 300,
        width: 500,
        fill: 'purple'
    }
    config.data = newData;
    return config;
}



export const barBrushConfig = {
    data: JSON.parse(JSON.stringify(data)),
    config: {
        margin: {top: 20, right: 20, bottom: 70, left: 40},
        miniMargin: {top: 10, right: 40, bottom: 70, left: 50},
        height: 300,
        width: 500,
        fill: 'purple'
    }
}



export const pieConfig = {
    data: [
        {
            "label": "Rushabh",
            "value": 200
        },
        {
            "label": "Shalini",
            "value": 500
        },
        {
            "label": "Sumit Avinash",
            "value": 300
        },
        {
            "label": "Soudip",
            "value": 350
        },
        {
            "label": "Nitish",
            "value": 500
        }
    ],
    config: {
        height: 400,
        width: 400,
        radius: 200,
        padding: 40,
        // color: d3.scaleOrdinal(d3.schemeCategory10),
        color: ['#F9DC5C', '#758E4F', '#86BBD8', '#F26419', '#33658A', '#231123', '#B1740F', '#DC6BAD', '#786F52', '#BEC5AD'],
        type: "donut",
        labelColor: 'black',
        labelPosition: 'outside'
    }
}



export const fetchStackedBarConfig = () => {
    let config = {};
    let newData = createStackedData();
    config.config = {
        margin: {top: 20, right: 20, bottom: 70, left: 40},
        miniMargin: {top: 10, right: 40, bottom: 70, left: 50},
        height: 300,
        width: 500,
        colors: ['#F18F01', '#2E4057', '#99C24D', '#048BA8', '#2F2D2E'],
        axes: {
            y: {
                axisColor: "#CCC",
                gridColor: "#EEE",
                color: "#CCC",
                fontSize: "9px",
                text: "Measure 1"

            },
            x: {
                axisColor: "#CCC",
                gridColor: "#EEE",
                color: "#CCC",
                fontSize: "9px",
                text: "Measure 2"
            }
        }
    }
    config.data = newData;
    return config;
}


export const lineConfig = {
    data: JSON.parse(JSON.stringify(createTimeSeriesData())),
    config: {
        margin: {
            top: 20,
            right: 40,
            bottom: 70,
            left: 50
        },
        margin2: {
            top: 10,
            right: 40,
            bottom: 20,
            left: 50
        },
        height: 300,
        width: 500,
        height2: 100,
        axes: {
            y: {
                axisColor: "#CCC",
                gridColor: "#EEE",
                color: "#CCC",
                fontSize: "6px",
                text: "Measure 1"

            },
            x: {
                axisColor: "#CCC",
                gridColor: "#EEE",
                color: "#CCC",
                fontSize: "6spx",
                text: "Measure 2"
            }
        },
        line: {
            color: "purple",
            cColor: "purple",
            cRadius: 5,
            strokeWidth: 1
        }
    }
}


export const lineConfigBasic = {
    data: 
    [   
        // JSON.parse(JSON.stringify(createTimeSeriesData())),
        // JSON.parse(JSON.stringify(createTimeSeriesData())),
        JSON.parse(JSON.stringify(createTimeSeriesData()))
    ],
    dataLabels: 
    [   
        "First",
        "Second",
        "Third"
    ],
    config: {
        margin: {
            top: 20,
            right: 40,
            bottom: 80,
            left: 50
        },
        margin2: {
            top: 10,
            right: 40,
            bottom: 20,
            left: 50
        },
        height: 300,
        width: 500,
        height2: 100,
        tooltip: {
            "background-color": "#555",
            "color": "white",
            "padding": "10px"
        },
        axes: {
            y: {
                axisColor: "#CCC",
                gridColor: "#EEE",
                color: "#555",
                fontSize: "12px",
                text: "Value"

            },
            x: {
                axisColor: "#CCC",
                gridColor: "#EEE",
                color: "#555",
                fontSize: "12px",
                text: "Date"
            }
        },
        line: {
            strokeDashArray: "",
            color: [ '#758E4F', '#F9DC5C', '#86BBD8', '#F26419', '#33658A', '#231123', '#B1740F', '#DC6BAD', '#786F52', '#BEC5AD' ],
            marker: {
                style: "circle", // circle, square, cross, triangle  
                size: 6,

            },
            strokeWidth: 1
        }
    }
}



export const fetchGaugeConfig = () => {
    let newGaugeConfig = {...gaugeConfig};
    newGaugeConfig.data.value = parseInt(Math.random() * 100);
    return newGaugeConfig;
}



export const scatterConfig = {
    data: createScatterData(),
    config: {
        height: 200,
        width: 200,
        margin: {
            top: 20,
            right: 20,
            bottom: 35,
            left: 35
        },
        radius: 3,
        color: "red",
        tooltip: {
            "background-color": "#555",
            "color": "white",
            "padding": "10px"
        },
        axes: {
            y: {
                axisColor: "#CCC",
                gridColor: "#EEE",
                color: "#CCC",
                fontSize: "6px",
                text: "Measure 1"

            },
            x: {
                axisColor: "#CCC",
                gridColor: "#EEE",
                color: "#CCC",
                fontSize: "6px",
                text: "Measure 2"
            }
        }
    }
}