import Chart from './Chart';
import Feed from './Feed';
import React, { Component } from 'react';
import dataMaker from '../utils/datamaker';
import axios from 'axios';
import { Container, Col, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Page extends Component {
  constructor(props) {
    super(props)

    // const {data, ticks} = dataMaker(lyrics)
    this.state = {
      lyrics: [],
      artistName: '',
      songName: '',
      data: [],
      ticks: [],
      url: '',
    }
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(inputValue) {
    // this.setState({
    //   url: inputValue,
    // })
    console.log('changed parent state', inputValue, this.state)
    const self = this;
    axios.post('http://localhost:2000/lyrics/az', {
      url: inputValue,
    })
      .then(function (response) {
        console.log(response);
        const {
          lyrics,
          songName,
          artistName,
        } = response.data
        const { data, ticks } = dataMaker(lyrics.replace(/\s+/gim, ' ') || '')
        self.setState({
          songName,
          artistName,
          data,
          ticks,
          lyrics: lyrics.split('\n'),
        })

        console.log('self.state ', self.state)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
      <Row>
        Song Name: {this.state.songName}
        <br />
        Artist Name: {this.state.artistName}
      </Row>
      <Row>
        <Col>
          <Chart data={this.state.data} ticks={this.state.ticks} />
        </Col>
        <Col>
          <Feed clickHandler={this.handleClick} lyrics={this.state.lyrics} />
        </Col>
      </Row>
      </Container>
    )
  }
}

export default Page;
