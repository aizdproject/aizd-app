import React, { Component } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

import AirTemperatureStats from '../Stats/Alpha4/AirTemperature';
import AirGasQualityStats from '../Stats/Alpha4/AirQuality';
import AirHumidityStats from '../Stats/Alpha4/AirHumidity';
import LightIntensityStats from '../Stats/Alpha4/LightIntensity';
import Air from '../Alpha4/Chart';
// import WeatherStatus from './Weather/WeatherStatus';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.onRadioBtnClick = this.onRadioBtnClick.bind(this);

    this.state = {
      dropdownOpen: false,
      radioSelected: 2
    };
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  onRadioBtnClick(radioSelected) {
    this.setState({
      radioSelected: radioSelected
    });
  }

  render() {
    return (
      <div className='animated fadeIn'>
        {/* <WeatherStatus /> */}
        <Row>
          <Col xs='12' sm='12' lg='12'>
            <div className='text-value'>Alpha Node 4 Data</div>
          </Col>
        </Row>
        <Row>
          <Col xs='12' sm='3' lg='3'>
            <AirTemperatureStats />
          </Col>
          <Col xs='12' sm='3' lg='3'>
            <AirGasQualityStats />
          </Col>
          <Col xs='12' sm='3' lg='3'>
            <AirHumidityStats />
          </Col>
          <Col xs='12' sm='3' lg='3'>
            <LightIntensityStats />
          </Col>
        </Row>

        <Row>
          <Col xs='12' sm='12' lg='12'>
            <Card>
              <CardBody>
                <Row>
                  <Col xs='6' sm='6' lg='6'>
                    <div className='text-value'>Chart</div>
                  </Col>
                </Row>
                <br />
                <Air />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
