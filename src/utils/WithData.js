import React, { Component } from 'react';

type WithDataProps = any;
type WithDataState = {
  data: any | null,
  error: any | null,
  isLoading: boolean,
};

export default function withData(loader: any => Promise<*>) {
  return (WrappedComponent: () => React$Element<*>) => {
    class WithDataClass extends Component<*, *, *> {
      props: WithDataProps;
      state: WithDataState;

      constructor(props: WithDataProps) {
        super(props);

        this.state = {
          data: null,
          error: null,
          isLoading: true,
        };
      }

      componentDidMount() {
        this.fetchData();
      }

      fetchData = (props: any = {}) => {
        this.setState({ isLoading: true });

        loader({ ...this.props, ...props })
          .then(data => this.setState({ data }))
          .catch(error => this.setState({ error }))
          .then(() => this.setState({ isLoading: false }));
      };

      render() {
        return (
          <WrappedComponent
            {...this.props}
            className={this.props.className}
            data={this.state.data}
            error={this.state.error}
            isLoading={this.state.isLoading}
            refetch={this.fetchData}
          />
        );
      }
    }

    return WithDataClass;
  };
}
