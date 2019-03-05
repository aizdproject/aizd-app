import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import axios from 'axios';
import Pusher from 'pusher-js';
import moment from 'moment';

const brandSuccess = getStyle('--success');
const brandInfo = getStyle('--info');
const brandDanger = getStyle('--danger');
const brandWarning = getStyle('--warning');

const pusher = new Pusher('b01fb79d33e790f8c38d', {
  cluster: 'ap1',
  encrypted: true
});
const channel = pusher.subscribe('alpha');

export default class AirChart extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      Data: {},
      mainChartOpts: {
        tooltips: {
          enabled: false,
          custom: CustomTooltips,
          intersect: true,
          mode: 'index',
          position: 'nearest',
          callbacks: {
            labelColor: function(tooltipItem, chart) {
              return {
                backgroundColor:
                  chart.data.datasets[tooltipItem.datasetIndex].borderColor
              };
            }
          }
        },
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: true
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                maxTicksLimit: 5,
                stepSize: 10
              }
            }
          ]
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
        }
      }
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    await axios.get('/api/v1/alpha/5c7e6839a73fb30004ead950').then(res => {
      const alpha = res.data;
      let temperature = [];
      let humidity = [];
      let gas_quality = [];
      let light_intensity = [];
      let soil_ec = [];
      let soil_epsilon = [];
      let soil_salinity = [];
      let soil_tds = [];
      let soil_temperature = [];
      let soil_vwc = [];
      let created_at = [];

      if (alpha) {
        let week = 0;
        let count = 0;
        let temp_temperature = 0;
        let temp_humidity = 0;
        let temp_gas_quality = 0;
        let temp_light_intensity = 0;
        let temp_soil_ec = 0;
        let temp_soil_epsilon = 0;
        let temp_soil_salinity = 0;
        let temp_soil_tds = 0;
        let temp_soil_temperature = 0;
        let temp_soil_vwc = 0;

        week = 0;
        count = 0;
        alpha.air_temperature.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let year = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).weekYear();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_temperature = 0;
          }
          if (temperature.length !== 0 && pop) {
            temperature.pop();
            created_at.pop();
          }
          temp_temperature += element;
          count++;
          temperature.push(temp_temperature / count);
          created_at.push('Minggu ' + now + ' (' + year + ')');
        });

        week = 0;
        count = 0;
        alpha.air_humidity.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_humidity = 0;
          }
          temp_humidity += element;
          count++;
          if (humidity.length !== 0 && pop) {
            humidity.pop();
          }
          humidity.push(temp_humidity / count);
        });

        week = 0;
        count = 0;
        alpha.air_quality.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_gas_quality = 0;
          }
          temp_gas_quality += element;
          count++;
          if (gas_quality.length !== 0 && pop) {
            gas_quality.pop();
          }
          gas_quality.push(temp_gas_quality / count);
        });

        week = 0;
        count = 0;
        alpha.light_intensity.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_light_intensity = 0;
          }
          temp_light_intensity += element;
          count++;
          if (light_intensity.length !== 0 && pop) {
            light_intensity.pop();
          }
          light_intensity.push(temp_light_intensity / count);
        });

        week = 0;
        count = 0;
        alpha.soil_ec.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_soil_ec = 0;
          }
          temp_soil_ec += element;
          count++;
          if (soil_ec.length !== 0 && pop) {
            soil_ec.pop();
          }
          soil_ec.push(temp_soil_ec / count);
        });

        week = 0;
        count = 0;
        alpha.soil_epsilon.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_soil_epsilon = 0;
          }
          temp_soil_epsilon += element;
          count++;
          if (soil_epsilon.length !== 0 && pop) {
            soil_epsilon.pop();
          }
          soil_epsilon.push(temp_soil_epsilon / count);
        });

        week = 0;
        count = 0;
        alpha.soil_salinity.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_soil_salinity = 0;
          }
          temp_soil_salinity += element;
          count++;
          if (soil_salinity.length !== 0 && pop) {
            soil_salinity.pop();
          }
          soil_salinity.push(temp_soil_salinity / count);
        });

        week = 0;
        count = 0;
        alpha.soil_tds.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_soil_tds = 0;
          }
          temp_soil_tds += element;
          count++;
          if (soil_tds.length !== 0 && pop) {
            soil_tds.pop();
          }
          soil_tds.push(temp_soil_tds / count);
        });

        week = 0;
        count = 0;
        alpha.soil_temperature.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_soil_temperature = 0;
          }
          temp_soil_temperature += element;
          count++;
          if (soil_temperature.length !== 0 && pop) {
            soil_temperature.pop();
          }
          soil_temperature.push(temp_soil_temperature / count);
        });

        week = 0;
        count = 0;
        alpha.soil_vwc.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_soil_vwc = 0;
          }
          temp_soil_vwc += element;
          count++;
          if (soil_vwc.length !== 0 && pop) {
            soil_vwc.pop();
          }
          soil_vwc.push(temp_soil_vwc / count);
        });
      }

      if (this._isMounted) {
        this.setState({
          Data: {
            labels: created_at,
            datasets: [
              {
                label: 'Temperature',
                backgroundColor: hexToRgba(brandInfo, 10),
                borderColor: brandInfo,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: temperature
              },
              {
                label: 'Humidity',
                backgroundColor: hexToRgba(brandDanger, 10),
                borderColor: brandDanger,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: humidity
              },
              {
                label: 'Gas Quality',
                backgroundColor: hexToRgba(brandSuccess, 10),
                borderColor: brandSuccess,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: gas_quality
              },
              {
                label: 'Light Intensity',
                backgroundColor: hexToRgba(brandWarning, 10),
                borderColor: brandWarning,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: light_intensity
              },
              {
                label: 'Soil EC',
                backgroundColor: hexToRgba(brandInfo, 10),
                borderColor: brandInfo,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: soil_ec
              },
              {
                label: 'Soil Epsilon',
                backgroundColor: hexToRgba(brandDanger, 10),
                borderColor: brandDanger,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: soil_epsilon
              },
              {
                label: 'Soil Salinity',
                backgroundColor: hexToRgba(brandSuccess, 10),
                borderColor: brandSuccess,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: soil_salinity
              },
              {
                label: 'Soil TDS',
                backgroundColor: hexToRgba(brandWarning, 10),
                borderColor: brandWarning,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: soil_tds
              },
              {
                label: 'Soil Temperature',
                backgroundColor: hexToRgba(brandDanger, 10),
                borderColor: brandDanger,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: soil_temperature
              },
              {
                label: 'Soil VWC',
                backgroundColor: hexToRgba(brandInfo, 10),
                borderColor: brandInfo,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: soil_vwc
              }
            ]
          }
        });
      }
    });

    await channel.bind('update-alpha', data => {
      const alpha = data;
      let temperature = [];
      let humidity = [];
      let gas_quality = [];
      let light_intensity = [];
      let soil_ec = [];
      let soil_epsilon = [];
      let soil_salinity = [];
      let soil_tds = [];
      let soil_temperature = [];
      let soil_vwc = [];
      let created_at = [];

      if (alpha) {
        let week = 0;
        let count = 0;
        let temp_temperature = 0;
        let temp_humidity = 0;
        let temp_gas_quality = 0;
        let temp_light_intensity = 0;
        let temp_soil_ec = 0;
        let temp_soil_epsilon = 0;
        let temp_soil_salinity = 0;
        let temp_soil_tds = 0;
        let temp_soil_temperature = 0;
        let temp_soil_vwc = 0;

        week = 0;
        count = 0;
        alpha.air_temperature.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let year = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).weekYear();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_temperature = 0;
          }
          if (temperature.length !== 0 && pop) {
            temperature.pop();
            created_at.pop();
          }
          temp_temperature += element;
          count++;
          temperature.push(temp_temperature / count);
          created_at.push('Minggu ' + now + ' (' + year + ')');
        });

        week = 0;
        count = 0;
        alpha.air_humidity.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_humidity = 0;
          }
          temp_humidity += element;
          count++;
          if (humidity.length !== 0 && pop) {
            humidity.pop();
          }
          humidity.push(temp_humidity / count);
        });

        week = 0;
        count = 0;
        alpha.air_quality.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_gas_quality = 0;
          }
          temp_gas_quality += element;
          count++;
          if (gas_quality.length !== 0 && pop) {
            gas_quality.pop();
          }
          gas_quality.push(temp_gas_quality / count);
        });

        week = 0;
        count = 0;
        alpha.light_intensity.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_light_intensity = 0;
          }
          temp_light_intensity += element;
          count++;
          if (light_intensity.length !== 0 && pop) {
            light_intensity.pop();
          }
          light_intensity.push(temp_light_intensity / count);
        });

        week = 0;
        count = 0;
        alpha.soil_ec.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_soil_ec = 0;
          }
          temp_soil_ec += element;
          count++;
          if (soil_ec.length !== 0 && pop) {
            soil_ec.pop();
          }
          soil_ec.push(temp_soil_ec / count);
        });

        week = 0;
        count = 0;
        alpha.soil_epsilon.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_soil_epsilon = 0;
          }
          temp_soil_epsilon += element;
          count++;
          if (soil_epsilon.length !== 0 && pop) {
            soil_epsilon.pop();
          }
          soil_epsilon.push(temp_soil_epsilon / count);
        });

        week = 0;
        count = 0;
        alpha.soil_salinity.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_soil_salinity = 0;
          }
          temp_soil_salinity += element;
          count++;
          if (soil_salinity.length !== 0 && pop) {
            soil_salinity.pop();
          }
          soil_salinity.push(temp_soil_salinity / count);
        });

        week = 0;
        count = 0;
        alpha.soil_tds.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_soil_tds = 0;
          }
          temp_soil_tds += element;
          count++;
          if (soil_tds.length !== 0 && pop) {
            soil_tds.pop();
          }
          soil_tds.push(temp_soil_tds / count);
        });

        week = 0;
        count = 0;
        alpha.soil_temperature.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            soil_temperature = 0;
          }
          soil_temperature += element;
          count++;
          if (soil_temperature.length !== 0 && pop) {
            soil_temperature.pop();
          }
          soil_temperature.push(soil_temperature / count);
        });

        week = 0;
        count = 0;
        alpha.soil_vwc.forEach((element, index) => {
          let now = moment(
            alpha.created_at[index],
            'DD/MM/YYYY-H:mm:ss'
          ).week();
          let pop = true;

          if (now !== week) {
            pop = false;
            week = now;
            count = 0;
            temp_soil_vwc = 0;
          }
          temp_soil_vwc += element;
          count++;
          if (soil_vwc.length !== 0 && pop) {
            soil_vwc.pop();
          }
          soil_vwc.push(temp_soil_vwc / count);
        });
      }

      if (this._isMounted) {
        this.setState({
          Data: {
            labels: created_at,
            datasets: [
              {
                label: 'Temperature',
                backgroundColor: hexToRgba(brandInfo, 10),
                borderColor: brandInfo,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: temperature
              },
              {
                label: 'Humidity',
                backgroundColor: hexToRgba(brandDanger, 10),
                borderColor: brandDanger,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: humidity
              },
              {
                label: 'Gas Quality',
                backgroundColor: hexToRgba(brandSuccess, 10),
                borderColor: brandSuccess,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: gas_quality
              },
              {
                label: 'Light Intensity',
                backgroundColor: hexToRgba(brandWarning, 10),
                borderColor: brandWarning,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: light_intensity
              },
              {
                label: 'Soil EC',
                backgroundColor: hexToRgba(brandInfo, 10),
                borderColor: brandInfo,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: soil_ec
              },
              {
                label: 'Soil Epsilon',
                backgroundColor: hexToRgba(brandDanger, 10),
                borderColor: brandDanger,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: soil_epsilon
              },
              {
                label: 'Soil Salinity',
                backgroundColor: hexToRgba(brandSuccess, 10),
                borderColor: brandSuccess,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: soil_salinity
              },
              {
                label: 'Soil TDS',
                backgroundColor: hexToRgba(brandWarning, 10),
                borderColor: brandWarning,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: soil_tds
              },
              {
                label: 'Soil Temperature',
                backgroundColor: hexToRgba(brandDanger, 10),
                borderColor: brandDanger,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: soil_temperature
              },
              {
                label: 'Soil VWC',
                backgroundColor: hexToRgba(brandInfo, 10),
                borderColor: brandInfo,
                pointHoverBackgroundColor: '#fff',
                borderWidth: 2,
                data: soil_vwc
              }
            ]
          }
        });
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <div
        className='chart-wrapper'
        style={{ height: 450 + 'px', marginTop: 40 + 'px' }}>
        <Line
          data={this.state.Data}
          options={this.state.mainChartOpts}
          height={600}
        />
      </div>
    );
  }
}
