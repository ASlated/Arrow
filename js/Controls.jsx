import KeyboardPicker from './KeyboardPicker.jsx';
import React from 'react';
import ReactDOM from 'react-dom';

const Controls = function(options) {
  ReactDOM.render(
    <KeyboardPicker onChange={options.onChangeKeyboardLayout} />,
    document.getElementById('controls')
  );
};

export default Controls;
