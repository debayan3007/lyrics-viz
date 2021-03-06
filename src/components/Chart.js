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
import { Image } from 'react-bootstrap';
import chartPlaceholder from '../bar_graph-512.png';

class App extends Component {
  render() {
    return (
      <div className="App">
        {
          this.props.ticks.length === 0 ? <Image src={chartPlaceholder} roundedCircle /> : <XYPlot width={700} height={700}>
            <XAxis tickTotal={this.props.ticks.length} tickFormat={v => this.props.ticks[v]} tickLabelAngle={-90} />
            <YAxis tickTotal={this.props.ticks.length} tickFormat={v => this.props.ticks[v]} tickLabelAngle={0} />
            <HorizontalGridLines tickTotal={this.props.ticks.length} />
            <VerticalGridLines tickTotal={this.props.ticks.length} />
            <MarkSeries data={this.props.data} />
          </XYPlot>
        }
      </div>
    );
  }
}

export default App;