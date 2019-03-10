import React, { Component } from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

import AirTemperatureStats from '../Stats/Alpha10/AirTemperature';
import AirGasQualityStats from '../Stats/Alpha10/AirQuality';
import AirHumidityStats from '../Stats/Alpha10/AirHumidity';
import LightIntensityStats from '../Stats/Alpha10/LightIntensity';
import SoilECStats from '../Stats/Alpha10/SoilEC';
import SoilEpsilonStats from '../Stats/Alpha10/SoilEpsilon';
import SoilSalinityStats from '../Stats/Alpha10/SoilSalinity';
import SoilTDSStats from '../Stats/Alpha10/SoilTDS';
import SoilTemperatureStats from '../Stats/Alpha10/SoilTemperature';
import SoilVWCStats from '../Stats/Alpha10/SoilVWC';
import Air from '../Alpha10/AirChart';
import Soil from '../Alpha10/SoilChart';
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
            <div className='text-value'>Alpha Node 10 Data</div>
          </Col>
        </Row>
        <Row>
          <Col xs='12' sm='4' lg='4'>
            <AirTemperatureStats />
          </Col>
          <Col xs='12' sm='4' lg='4'>
            <AirGasQualityStats />
          </Col>
          <Col xs='12' sm='4' lg='4'>
            <AirHumidityStats />
          </Col>
        </Row>
        <Row>
          <Col xs='12' sm='3' lg='3'>
            <LightIntensityStats />
          </Col>
          <Col xs='12' sm='3' lg='3'>
            <SoilECStats />
          </Col>
          <Col xs='12' sm='3' lg='3'>
            <SoilEpsilonStats />
          </Col>
          <Col xs='12' sm='3' lg='3'>
            <SoilSalinityStats />
          </Col>
        </Row>
        <Row>
          <Col xs='12' sm='4' lg='4'>
            <SoilTDSStats />
          </Col>
          <Col xs='12' sm='4' lg='4'>
            <SoilTemperatureStats />
          </Col>
          <Col xs='12' sm='4' lg='4'>
            <SoilVWCStats />
          </Col>
        </Row>

        <Row>
          <Col xs='12' sm='12' lg='12'>
            <Card>
              <CardBody>
                <Row>
                  <Col xs='6' sm='6' lg='6'>
                    <div className='text-value'>Air Chart</div>
                  </Col>
                </Row>
                <br />
                <Air />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs='12' sm='12' lg='12'>
            <Card>
              <CardBody>
                <Row>
                  <Col xs='6' sm='6' lg='6'>
                    <div className='text-value'>Soil Chart</div>
                  </Col>
                </Row>
                <br />
                <Soil />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Dashboard;
