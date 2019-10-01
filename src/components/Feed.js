import React, { Component } from 'react';
import { Container, Row, Button, InputGroup, FormControl, ListGroup } from 'react-bootstrap';
import Lyrics from './Lyrics';
import axios from 'axios';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      inputValue: '',
      searchResults: [],
      showResults: true,
    }

    this.handleChange = this.handleChange.bind(this);
    this.searchForSongs = this.searchForSongs.bind(this);
    this.itemClicked = this.itemClicked.bind(this);
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  searchForSongs() {
    const self = this
    console.log('trigger search for ', this.state.inputValue)
    axios.get(`http://localhost:2000/lyrics/search?q=${this.state.inputValue}&page=1`)
      .then(function (response) {
        console.log(response.data);
        self.setState({
          searchResults: response.data,
        })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  itemClicked(event) {
    this.props.clickHandler(event.target.getAttribute('url'))
    this.setState({
      showResults: false,
    })
  }

  render() {
    console.log('this.state.showResults -> ', this.state.showResults)
    return (
      <Container>
        <Row>
          <InputGroup className="mb-3" onChange={this.handleChange}>
            <FormControl
              placeholder="Search for a song"
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={this.searchForSongs}>Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
        <Row
          style={{
            display: this.state.showResults ? 'block' : 'none',
          }}
        >
          <ListGroup
            style={
              {
                width: '100%',
              }
            }
          >
            {
              this.state.searchResults.map((item, i) => {
                return (
                  <ListGroup.Item action onClick={this.itemClicked} key={`result${i}`} url={item.songLink} >
                    {item.songName} <small style={{ color: '#ababab', pointerEvents: 'none' }}>by {item.artistName}</small>
                  </ListGroup.Item>
                );
              })
            }
          </ListGroup>
        </Row>
        <Row>
          <Lyrics lyrics={this.props.lyrics} />
        </Row>
      </Container>
    )
  }
}

export default Feed