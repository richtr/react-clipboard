const React = require("react");
const ReactDOM = require("react-dom");

function noop() {}

const Clipboard = React.createClass({

  propTypes: {
    value : React.PropTypes.string.isRequired,
    className : React.PropTypes.string,
    style : React.PropTypes.object,
    onCopy : React.PropTypes.func
  },

  getDefaultProps() {
    return {
      className : "clipboard",
      style : {
        position : "fixed",
        overflow : "hidden",
        clip     : "rect(0 0 0 0)",
        height   : 1,
        width    : 1,
        margin   : -1,
        padding  : 0,
        border   : 0
      },
      onCopy : noop
    };
  },

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown, false);
    document.addEventListener("keyup", this.handleKeyUp, false);
  },

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
    document.removeEventListener("keyup", this.handleKeyUp, false);
  },

  render() {
    return <textarea {...this.props} readOnly onCopy={this.handleCopy} />
  },

  handleCopy(e) {
    this.props.onCopy(e);
  },

  handleKeyDown(e) {
    const metaKeyIsDown = (e.ctrlKey || e.metaKey);
    const textIsSelected = window.getSelection().toString();

    if(!metaKeyIsDown || textIsSelected) {
      return;
    }

    const element = ReactDOM.findDOMNode(this);
    element.focus();
    element.select();
  },

  handleKeyUp(e) {
    const element = ReactDOM.findDOMNode(this);
    element.blur();
  }

});

module.exports = Clipboard;
