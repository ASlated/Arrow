import React from 'react';

class KeyboardPicker extends React.Component {

  constructor(props) {
    super(props);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = { layout: 'dvorak' };
  }

  onSelectChange(event) {
    const layout = event.target.value;
    this.setState({layout: layout});
    this.props.onChange(layout);
  }

  render() {
    return (
      <select onChange={this.onSelectChange} value={this.state.layout}>
        <option value="dvorak">dvorak</option>
        <option value="qwerty">qwerty</option>
      </select>
    );
  }
}

export default KeyboardPicker;
