import React, { Component } from 'react';
import { Container, Row, Button, InputGroup, FormControl, ListGroup, Pagination, Col } from 'react-bootstrap';
import Lyrics from './Lyrics';
import axios from 'axios';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      inputValue: '',
      searchResults: [],
      showResults: false,
      active: 1,
    }

    this.handleChange = this.handleChange.bind(this);
    this.searchForSongs = this.searchForSongs.bind(this);
    this.itemClicked = this.itemClicked.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.pageChange = this.pageChange.bind(this);
  }

  pageChange (event) {
    this.setState({
      active: event.target.innerHTML,
    });
    this.searchForSongs(event.target.innerHTML);
  }

  handleChange(event) {
    this.setState({
      inputValue: event.target.value,
    });
  }

  handleKeyDown(event) {
    if (event.key === 'Enter') {
      this.searchForSongs()
    }
  }

  searchForSongs(page = 1) {
    const self = this
    self.setState({
      showResults: true,
      searchResults: [],
    })
    axios.get(`http://localhost:2000/lyrics/search?q=${this.state.inputValue}&page=${page}`)
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
    let items = [];
    for (let number = 1; number <= 7; number++) {
      items.push(
        <Pagination.Item onClick={this.pageChange} key={number} active={number === Number(this.state.active)}>
          {number}
        </Pagination.Item>,
      );
    }
    return (
      <Container>
        <Row>
          <InputGroup className="mb-3" onChange={this.handleChange} onKeyDown={this.handleKeyDown} >
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
        <Row style={{
            display: this.state.showResults ? 'none' : 'block',
          }}>
          <Lyrics lyrics={this.props.lyrics} />
        </Row>
        <Row>
          <Col>
            <Pagination style={{visibility: this.state.showResults ? 'visible' : 'hidden'}} >
              {items}
            </Pagination>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Feed