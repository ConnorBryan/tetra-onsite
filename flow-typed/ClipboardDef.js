declare module 'react-clipboard.js' {
  declare export default class ClipboardButton extends React$Component {
    props: {
      className?: string,
      'data-clipboard-text': string,
      onSuccess?: () => any,
    }
  }
}
