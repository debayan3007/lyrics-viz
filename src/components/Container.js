import Chart from './Chart';
import Feed from './Feed';
import React, { Component } from 'react';
import dataMaker from '../utils/datamaker';
import axios from 'axios';
import { Container, Col, Row, Jumbotron } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Page extends Component {
  constructor(props) {
    super(props)
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

  handleClick({
    trackId,
    songName = '#song name#',
    artistName = '#artist name#',
  }) {
    const self = this;
    axios.get(`/lyrics/get/${trackId}`)
      .then(function (response) {
        const {
          lyrics = '#lyrics#',
        } = response.data;

        console.log(response.data);

        const { data, ticks } = dataMaker(lyrics.replace(/\s+/gim, ' ') || '')
        self.setState({
          songName,
          artistName,
          data,
          ticks,
          lyrics: lyrics.split('\n'),
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <Container>
        <Row>
          <Jumbotron style={{ width: '100%', height: '20vh' }}>
            {
              this.state.songName === '' ? <Container>
                <h3>Select a song to see the repititveness of the lyrics...</h3>
              </Container> : <Container>
                <h1>{this.state.songName}</h1>
                <p>by {this.state.artistName}</p>
              </Container>
            }
          </Jumbotron>
        </Row>
        <Row>
          <Col>
            <Container>
              <Row>
                <Chart data={this.state.data} ticks={this.state.ticks} />
              </Row>
            </Container>
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
