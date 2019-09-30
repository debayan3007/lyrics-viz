import React, { Component } from 'react';
import '../App.css';
import '../../node_modules/react-vis/dist/style.css';
import {
  XYPlot,
  MarkSeries,
  XAxis,
  YAxis,
  HorizontalGridLines,
  VerticalGridLines,
} from 'react-vis';

class App extends Component {
  render() {
    console.log(this.props.ticks.length)
    return (
      <div className="App">
        <XYPlot width={700} height={700}>
          <XAxis tickFormat={v => this.props.ticks[v]} tickLabelAngle={-90} />
          <YAxis tickFormat={v => this.props.ticks[v]} tickLabelAngle={0} />
          <HorizontalGridLines tickTotal={this.props.ticks.length} />
          <VerticalGridLines tickTotal={this.props.ticks.length} />
          <MarkSeries data={this.props.data} />
        </XYPlot>
      </div>
    );
  }
}

export default App;