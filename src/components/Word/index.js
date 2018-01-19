import React, { Component } from 'react';

type WordProps = {
  startTime: ?number,
  setTime: number => void,
  duration: ?number,
  name: string,
  progress: number,
  wordColor?: string,
};

export default class Word extends Component {
  props: WordProps;
  domRef: any;

  constructor(props: WordProps) {
    super(props);
  }

  isActive = () => {
    const startTime = this.props.startTime;
    if (startTime != null && this.props.duration != null) {
      const endTime = startTime + this.props.duration;
      return startTime <= this.props.progress && endTime >= this.props.progress;
    }
    return false;
  };

  onClick = () => {
    if (this.props.startTime != null) {
      this.props.setTime(this.props.startTime);
    }
  };

  render() {
    return (
      <span
        ref={ref => (this.domRef = ref)}
        className={this.isActive() ? 'active' : ''}
        onClick={this.onClick}
        style={{
          cursor: 'pointer',
          borderBottom: this.isActive() ? '2px solid #f00' : '0',
          backgroundColor: this.props.wordColor,
        }}
      >
        {this.props.name}
      </span>
    );
  }
}
