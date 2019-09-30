import React, { Component } from 'react'

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '',
      inputValue: '',
    }

    this.handleChange = this.handleChange.bind(this);
    // this.handleClick = this.handleClick.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value});
    this.props.clickHandler(event.target.value)
  }

  render() {
    // console.log(this.props)
    return (
      <div>
        <form>
          <label>
            Url:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
        </form>
      </div>
    )
  }
}

export default Feed