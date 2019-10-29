import * as React from 'react';
import { connect } from 'react-redux';
import * as cx from 'classnames';
import { bindActionCreators } from 'redux';

import { ReduxState } from 'src/redux/root_reducer';
import { DemoState, add_num, minus_num } from './redux';
import './index.scss';

interface IndexProps {
  demoState:DemoState;
  add_num:typeof add_num;
  minus_num:typeof minus_num;
}

class Index extends React.PureComponent<IndexProps, any> {
  constructor(props:any) {
    super(props);
    this.state = {
      num: 0
    }
  }
  
  handleAdd() {
    this.setState({
      num: this.state.num + 1
    })
  }
  render() {
    const { num } = this.props.demoState;
   
    return (
      <div>
        <h1>This is a demo</h1>
        <p>{this.state.num}</p>
        <div>
          <span styleName={cx('is_black', num % 2 === 0 && 'is_red')}>{num}</span>
          {/* <button onClick={() => {this.handleAdd(); }}>+</button> */}
          <button onClick={() => {this.props.add_num(1); }}>+</button>
          <button onClick={() => {this.props.minus_num(1); }}>-</button>
        </div>
      </div>
    );
  }
}

const map_state_to_props = (state:ReduxState) => ({
  demoState: state.demoState,
});
const map_dispatch_to_props = (dispatch:any) => bindActionCreators({
  add_num,
  minus_num,
}, dispatch);

export default connect(
  map_state_to_props,
  map_dispatch_to_props,
)(Index);
// export default Index
