import React from 'react';

interface State {
  hasError: boolean;
  error?: Error | null;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // Log to console for now — can be extended to send to a monitoring service
    // eslint-disable-next-line no-console
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 32, background: '#000' }}>
          <div style={{ maxWidth: 800, color: '#fff', background: '#0b0b0b', padding: 24, borderRadius: 12, boxShadow: '0 8px 30px rgba(0,0,0,0.6)' }}>
            <h2 style={{ marginBottom: 12 }}>Something went wrong</h2>
            <pre style={{ whiteSpace: 'pre-wrap', color: '#ff6b6b' }}>{String(this.state.error?.message)}</pre>
            <details style={{ marginTop: 12, color: '#aaa' }}>
              <summary>Show stack</summary>
              <pre style={{ whiteSpace: 'pre-wrap', color: '#ddd' }}>{String(this.state.error?.stack)}</pre>
            </details>
          </div>
        </div>
      );
    }
    return this.props.children as JSX.Element;
  }
}

export default ErrorBoundary;
