import * as React from 'react';const ReactHighcharts = require('react-highcharts');import products from '../../fixture';import { DataRow } from '../../fixture';import './charts.css';interface MyProps {}interface MyState {}export default class Charts extends React.Component<MyProps, MyState> {    prods: DataRow[] = [];    years: any = [];    options: any = [];    config = {        chart: {            type: 'scatter',            zoomType: 'xy'        },        title: {            text: 'Height Versus Weight of 507 Individuals by Gender'        },        subtitle: {            text: 'Source: Heinz  2003'        },        xAxis: {            title: {                enabled: true,                text: 'Fixture1 (cm)'            },            startOnTick: true,            endOnTick: true,            showLastLabel: true        },        yAxis: {            title: {                text: 'Fixture2 (kg)'            }        },        legend: {            layout: 'vertical',            align: 'left',            verticalAlign: 'top',            x: 0,            y: 0,            floating: false,            backgroundColor: (ReactHighcharts.theme && ReactHighcharts.theme.legendBackgroundColor) || '#FFFFFF',            borderWidth: 1        },        plotOptions: {            scatter: {                marker: {                    radius: 5,                    states: {                        hover: {                            enabled: true,                            lineColor: 'rgb(100,100,100)'                        }                    }                },                states: {                    hover: {                        marker: {                            enabled: false                        }                    }                },                tooltip: {                    headerFormat: '<b>{series.name}</b><br>',                    pointFormat: '{point.x} cm, {point.y} kg'                }            }        },        series: [{}]    };    press(e: any) {        let currentYear = e.target.value;        if (currentYear !== 'All') {            this.prods = products.filter((res) => {                return +res.year === +currentYear;            });        } else {            this.prods = products;        }        this.setState({            upd: true        });    }    unique(arr: number[]) {        let obj = {};        for (let i = 0; i < arr.length; i++) {            let str = arr[i];            obj[str] = true; // запомнить строку в виде свойства объекта        }        return Object.keys(obj); // или собрать ключи перебором для IE8-    }    generateColor() {        return '#' + Math.floor(Math.random() * 16777215).toString(16);    }    constructor (state: MyState, props: MyProps) {        super(state , props);        this.state = {upd: false};        this.prods = products;        this.press = this.press.bind(this);    }    render() {        this.config.series = [];        this.options = [];        for (let product of this.prods) {            this.config.series.push({                name: product.name + ' ' + product.year,                color: this.generateColor(),                data: [[product.feature1, product.feature2]]            });            this.years.push(product.year);        }        for (let year of  this.unique(this.years)) {            this.options.push(year);        }        return(            <div className="chart__wrapper">                <p>Выбор года: </p>                <select onClick={this.press}>                    <option value="All">Все</option>                    {this.options.map((i: any , index: number) => {                        return <option key={index} value={i} >{i}</option>;                    })}                </select>                <ReactHighcharts config={this.config} domProps={{id: 'chartId'}}/>            </div>        );    }}