import React, { Component } from 'react';
import { WebView } from 'react-native-webview';

export default class WebViewScreen extends Component {
  constructor (props) {
    super (props);
  }
  render() {
    return (
      <WebView
        source={{
          uri: this.props.route.params.url
        }}
        style={{ marginTop: 0 }}
      />
    );
  }
}
