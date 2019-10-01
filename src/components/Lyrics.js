import React, { Component } from 'react';

class Lyrics extends Component {
  render() {
    return (
      <div
      >
        {this.props.lyrics.map((el, i) => {
          if (el.trim() === '') {
            return (
              <div key={`para-${i}`}>
                <br />
              </div>
            )
          }
          return (
            <div key={`para-${i}`}>
              {el}
              <br />
            </div>
          );
        })}
      </div>
    )
  }
}

export default Lyrics