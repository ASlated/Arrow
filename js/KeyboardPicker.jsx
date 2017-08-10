import React from 'react';

class KeyboardPicker extends React.Component {

  constructor(props) {
    super(props);
    this.onSelectChange = this.onSelectChange.bind(this);
    this.state = { layout: 'qwerty' };
  }

  onSelectChange(event) {
    const layout = event.target.value;
    this.setState({layout: layout});
    this.props.onChange(layout);
  }

  render() {
    return (
      <select onChange={this.onSelectChange}>
        <option value="qwerty">qwerty</option>
        <option value="dvorak">dvorak</option>
      </select>
    );
  }
}

export default KeyboardPicker;
