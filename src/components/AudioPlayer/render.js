import React, { Component } from 'react';
import Icon from 'src/components/Icon';
import './styles.scss';

type AudioPlayerProps = {
  currentAudioTime: number,
  duration: number,
  source: string,
  playbackRate?: number,
  isPlaying: boolean,
  setIsPlaying: boolean => void,
  currentAudioTime: number,
  setCurrentAudioTime: number => void,
  progressBarPercentage: number, // computed by recompose
  children: React$Element<*> | Array<React$Element<*>>,
};

type AudioPlayerState = {
  isMuted: boolean,
  progressBarWidth: number,
};

function formatTime(seconds) {
  return seconds != null && !Number.isNaN(seconds)
    ? `${Math.floor(seconds / 60)}:${seconds % 60 < 10 ? '0' : ''}${Math.floor(
        seconds % 60
      )}`
    : '0:00';
}

export default class AudioPlayer extends Component {
  props: AudioPlayerProps;
  state: AudioPlayerState;
  progressBarRef: any;
  scrubberRef: any;
  audioRef: any;
  fillBarRef: any;

  constructor(props: AudioPlayerProps) {
    super(props);

    this.state = {
      isMuted: false,
      progressBarWidth: 0,
    };
  }

  componentDidMount() {
    this.updateDomState();
    window.addEventListener('resize', this.updateDomState);
    this.audioRef.playbackRate = this.props.playbackRate || 1;
  }

  componentWillReceiveProps(nextProps: AudioPlayerProps) {
    const isLargeAudioSeek =
      Math.abs(nextProps.currentAudioTime - this.props.currentAudioTime) > 1;
    if (isLargeAudioSeek) {
      this.setCurrentAudioRefTime(nextProps.currentAudioTime);
    }

    if (!this.props.isPlaying && nextProps.isPlaying) {
      this.audioRef.play();
    } else if (this.props.isPlaying && !nextProps.isPlaying) {
      this.audioRef.pause();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDomState);
  }

  updateDomState = () => {
    this.setState({
      progressBarWidth: this.progressBarRef.offsetWidth,
    });
  };

  handleMouseDown = () => {
    this.audioRef.pause();
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  handleMouseUp = (e: SyntheticMouseEvent) => {
    this.handleMouseMove(e); // for when the user clicked to seek without moving the mouse
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  };

  handleMouseMove = ({ clientX }: SyntheticMouseEvent) => {
    const barRect = this.progressBarRef.getBoundingClientRect();
    const mousePosition = Math.min(
      Math.max(0, clientX - barRect.left),
      barRect.right - barRect.left
    ); // clamp mousePosition to 0 - barWidth
    const mousePercentage = mousePosition / this.state.progressBarWidth;
    const seekPosition = this.props.duration * mousePercentage;
    this.audioRef.currentTime = seekPosition;
  };

  mute = () => {
    this.audioRef.muted = true;
    this.setState({ isMuted: true });
  };

  unmute = () => {
    this.audioRef.muted = false;
    this.setState({ isMuted: false });
  };

  setCurrentAudioRefTime = (time: number) => {
    this.audioRef.currentTime = time;
  };

  render() {
    const {
      props: {
        isPlaying,
        duration,
        progressBarPercentage,
        setCurrentAudioTime,
        source,
        children,
      },
      state: { isMuted },
    } = this;

    const scrubberStyle = {
      left: `${progressBarPercentage}%`,
    };
    const fillBarStyle = {
      width: `${progressBarPercentage}%`,
    };

    return (
      <div className="controlBar">
        {children}
        <div className="row">
          <div className="controlButtonWrapper col-xs-2">
            <a href={source}>
              <Icon glyph="file_download" color="#fff" />
            </a>

            <div
              display-if={!isPlaying}
              onClick={() => this.props.setIsPlaying(true)}
            >
              <Icon glyph="play_arrow" color="#fff" />
            </div>
            <div
              display-if={isPlaying}
              onClick={() => this.props.setIsPlaying(false)}
            >
              <Icon glyph="pause" color="#fff" />
            </div>

            <div display-if={!isMuted} onClick={this.mute}>
              <Icon glyph="volume_off" color="#fff" />
            </div>
            <div display-if={isMuted} onClick={this.unmute}>
              <Icon glyph="volume_up" color="#fff" />
            </div>
          </div>
          <div className="audioPlayerWrapper col-xs-8">
            <div
              ref={ref => (this.progressBarRef = ref)}
              className="progressBar"
              onMouseDown={this.handleMouseDown}
            >
              <div
                ref={ref => (this.fillBarRef = ref)}
                className="fillBar"
                onMouseDown={this.handleMouseDown}
                style={fillBarStyle}
              />
            </div>
            <div
              ref={ref => (this.scrubberRef = ref)}
              className="scrubber"
              onMouseDown={this.handleMouseDown}
              style={scrubberStyle}
            />
          </div>
          <span className="audioTimeLabel">
            {this.audioRef != null
              ? `${formatTime(this.audioRef.currentTime)}`
              : '0.00'}
            {` / ${formatTime(duration)}`}
          </span>
        </div>
        <audio
          ref={ref => (this.audioRef = ref)}
          controls
          onTimeUpdate={() => setCurrentAudioTime(this.audioRef.currentTime)}
          src={source}
        />
      </div>
    );
  }
}
