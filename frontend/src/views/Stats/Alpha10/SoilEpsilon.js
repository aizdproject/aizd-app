import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { Card, CardBody } from 'reactstrap';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import axios from 'axios';
import Pusher from 'pusher-js';
import CountUp from 'react-countup';

const pusher = new Pusher('b01fb79d33e790f8c38d', {
  cluster: 'ap1',
  encrypted: true
});
const channel = pusher.subscribe('alpha');

export default class PotNodeChart extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);
    this.state = {
      Value: 0,
      Data: {},
      mainChartOpts: {
        tooltips: {
          enabled: false,
          custom: CustomTooltips
        },
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false
            }
          ]
        },
        elements: {
          line: {
            borderWidth: 2
          },
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4
          }
        }
      }
    };
  }

  async componentDidMount() {
    this._isMounted = true;
    await axios.get('/api/v1/alpha/5c7e6839a73fb30004ead950').then(res => {
      const alpha_node = res.data;
      let soil_epsilons = [];
      let created_at = [];
      console.log(alpha_node);
      let last_soil_epsilon =
        alpha_node.soil_epsilon[alpha_node.soil_epsilon.length - 1];

      if (alpha_node) {
        alpha_node.soil_epsilon.forEach(element => {
          soil_epsilons.push(element);
        });

        alpha_node.created_at.forEach(element => {
          created_at.push(element);
        });

        if (this._isMounted) {
          this.setState({
            Data: {
              labels: created_at,
              datasets: [
                {
                  label: 'Soil Epsilon',
                  backgroundColor: 'rgba(255,255,255,.2)',
                  borderColor: 'rgba(255,255,255,.55)',
                  data: soil_epsilons
                }
              ]
            },
            Value: last_soil_epsilon
          });
        }
      }
    });

    await channel.bind('update-alpha', data => {
      const alpha_node = data;
      let soil_epsilons = [];
      let created_at = [];
      let last_soil_epsilon =
        alpha_node.soil_epsilon[alpha_node.soil_epsilon.length - 1];

      if (alpha_node) {
        alpha_node.soil_epsilon.forEach(element => {
          soil_epsilons.push(element);
        });

        alpha_node.created_at.forEach(element => {
          created_at.push(element);
        });

        if (this._isMounted) {
          this.setState({
            Data: {
              labels: created_at,
              datasets: [
                {
                  label: 'Soil Epsilon',
                  backgroundColor: 'rgba(255,255,255,.2)',
                  borderColor: 'rgba(255,255,255,.55)',
                  data: soil_epsilons
                }
              ]
            },
            Value: last_soil_epsilon
          });
        }
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <Card className='text-white bg-success'>
        <CardBody className='pb-0'>
          <div className='text-value'>
            <CountUp end={this.state.Value} duration={1} decimals={2} />
          </div>
          <div>Soil Epsilon</div>
        </CardBody>
        <div className='chart-wrapper' style={{ height: '70px' }}>
          <Line
            data={this.state.Data}
            options={this.state.mainChartOpts}
            height={70}
          />
        </div>
      </Card>
    );
  }
}
