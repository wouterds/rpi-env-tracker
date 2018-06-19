import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getSensors } from 'store/selectors/sensors';
import { getActiveSensor } from 'store/selectors/activeSensor';
import { getActivePeriod } from 'store/selectors/activePeriod';
import { setSensors } from 'store/actions/sensors';
import { setCharts } from 'store/actions/charts';
import { setActiveSensor } from 'store/actions/activeSensor';

const App = (WrappedComponent) => {
  class App extends Component {
    socket: WebSocket = null;

    /**
     * Component did mount
     */
    componentDidMount() {
      this.connect();
    }

    /**
     * Component will unmount
     */
    componentWillUnmount() {
      this.disconnect();
    }

    /**
     * Component updated
     *
     * @param {Object} prevProps
     */
    componentDidUpdate(prevProps) {
      const { setActiveSensor, activeSensor, activePeriod } = this.props;

      // New period? Reconnect
      if (activePeriod !== prevProps.activePeriod) {
        this.tellSocketAboutPeriod();
      }

      // No active sensor yet but we do have temperature sensor
      if (prevProps.sensors.temperature && !prevProps.activeSensor) {
        setActiveSensor('temperature');
      }

      if (activeSensor !== prevProps.activeSensor) {
        location.hash = `#${activeSensor}`;
      }
    }

    /**
     * Connect to websocket
     */
    connect() {
      // Source
      const source = `${location.protocol === 'https:' ? 'wss' : 'ws'}:/${location.host}/api`;
      // const source = 'wss://tracker.wouterdeschuyter.be/api';

      // Open connection
      this.socket = new WebSocket(source);

      // Subscribe to new messages
      this.socket.onmessage = this.newMessage;

      // Listen when socket is opened
      this.socket.onopen = this.onOpen;
    }

    /**
     * Disconnect from websocket
     */
    disconnect() {
      if (this.socket === null) {
        return;
      }

      this.socket.close();
      this.socket = null;
    }

    /**
     * Ask socket for data
     */
    tellSocketAboutPeriod() {
      if (!this.socket || this.socket === null) {
        throw new Error('no socket');
      }

      const { activePeriod } = this.props;

      this.socket.send(JSON.stringify({ period: activePeriod }));
    }

    /**
     * When socket is opened
     */
    onOpen = () => {
      // Ask data for period
      this.tellSocketAboutPeriod();
    }

    /**
     * New message from socket
     *
     * @param {Object} rawData
     */
    newMessage = (event: Object) => {
      const { setSensors, setCharts } = this.props;
      const data = JSON.parse(event.data);

      switch (data.type) {
        // Sensor data
        case 'sensor':
          setSensors(data);
          break;

        // Chart data
        case 'chart':
          setCharts(data);
          break;
      }
    }

    /**
     * Render
     *
     * @returns {Node}
     */
    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  /**
   * Map state to props
   *
   * @param {Object} state
   * @return {Object}
   */
  const mapStateToProps = (state) => {
    return {
      sensors: getSensors(state),
      activeSensor: getActiveSensor(state),
      activePeriod: getActivePeriod(state),
    };
  };

  /**
   * Map dispatch to props
   *
   * @param {Function} dispatch
   * @return {Object}
   */
  const mapDispatchToProps = (dispatch) => {
    return {
      setSensors: (data) => {
        dispatch(setSensors(data));
      },
      setCharts: (data) => {
        dispatch(setCharts(data));
      },
      setActiveSensor: (data) => {
        dispatch(setActiveSensor(data));
      },
    };
  };

  return connect(mapStateToProps, mapDispatchToProps)(App);
};

export default App;
