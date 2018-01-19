import {
  compose,
  getContext,
  lifecycle,
  withContext,
  withState,
} from 'recompose';
import { func, shape, string } from 'prop-types';

const tetraThemePropType = shape({
  name: string,
  update: func.isRequired,
}).isRequired;

export function composeWithTheme(WrappedComponent: () => React$Element<*>) {
  return compose(
    withState('theme', 'setTheme', null),
    withContext({ tetraTheme: tetraThemePropType }, ({ theme, setTheme }) => {
      const updateTheme = newTheme => {
        // Remove old themes
        if (document.documentElement)
          document.documentElement.classList.remove(theme);

        // Add new themes
        if (newTheme != null && document.documentElement)
          document.documentElement.classList.add(newTheme);

        // Set theme state
        setTheme(newTheme);
      };

      return {
        tetraTheme: { name: theme, update: updateTheme },
      };
    })
  )(WrappedComponent);
}

type TetraTheme = 'red' | 'white' | 'marketing';

export function setTheme(theme: TetraTheme) {
  return compose(
    getContext({ tetraTheme: tetraThemePropType }),
    lifecycle({
      componentDidMount() {
        const { tetraTheme } = this.props;
        tetraTheme.update(theme);
      },
    })
  );
}

export function withTetraTheme() {
  return getContext({ tetraTheme: tetraThemePropType });
}
