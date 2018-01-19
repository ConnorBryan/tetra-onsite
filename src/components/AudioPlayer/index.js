import { compose, withProps } from 'recompose';
import AudioPlayer from './render';

export default compose(
  withProps(({ duration, currentAudioTime }) => {
    const progressBarPercentage = currentAudioTime / duration * 100;
    return { progressBarPercentage };
  })
)(AudioPlayer);
