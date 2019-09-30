import Chart from './Chart';
import Feed from './Feed';
import React, { Component } from 'react';
import dataMaker from '../utils/datamaker';
import axios from 'axios';

// const lyrics = `These mist covered mountains Are a home now for me But my home is the lowlands And always will be Some day you'll return to Your valleys and your farms And you'll no longer burn To be brothers in arms Through these fields of destruction Baptisms of fire I've witnessed your suffering As the battle raged high And though they did hurt me so bad In the fear and alarm You did not desert me My brothers in arms There's so many different worlds So many different suns And we have just one world But we live in different ones Now the sun's gone to hell And the moon riding high Let me bid you farewell Every man has to die But it's written in the starlight And every line in your palm We're fools to make war On our brothers in arms`


class Container extends Component {
  constructor(props) {
    super(props)

    // const {data, ticks} = dataMaker(lyrics)
    this.state = {
      lyrics: '',
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
        const { data, ticks } = dataMaker(lyrics || '')
        self.setState({
          songName,
          artistName,
          data,
          ticks,
        })

        console.log('self.state ', self.state)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        Song Name: {this.state.songName}
        <br />
        Artist Name: {this.state.artistName}
        <Chart data={this.state.data} ticks={this.state.ticks} />
        <Feed clickHandler={this.handleClick} />
      </div>
    )
  }
}

export default Container;