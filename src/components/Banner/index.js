import { compose, withProps, withState } from 'recompose';
import { withTetraTheme } from 'src/utils/Theme';
import Banner from './render';

export default compose(
  withTetraTheme(),
  withState('isClosed', 'setIsClosed', false),
  withProps(({ isClosed, setIsClosed, onClose }) => {
    return {
      isBannerClosed: isClosed,
      close: () => {
        setIsClosed(true);
        if (onClose != null) onClose();
      },
    };
  })
)(Banner);
