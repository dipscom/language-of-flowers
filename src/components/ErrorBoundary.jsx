import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div id="error-boundary">
          <p>Something went wrong. Please refresh the page and try again.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
