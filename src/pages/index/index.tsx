import * as React from 'react';
import { connect } from 'react-redux';
import * as cx from 'classnames';
import { bindActionCreators } from 'redux';

import { ReduxState } from 'src/redux/root-reducer';
import { DemoState, add_num, minus_num } from './redux';
import './index.scss';

interface IIndexProps {
  demoState:DemoState;
  add_num:typeof add_num;
  minus_num:typeof minus_num;
}

class Index extends React.PureComponent<IIndexProps> {
  private _divider = 2;
  render() {
    const { num } = this.props.demoState;
    return (
      <div>
        <h1>This is a demo.</h1>
        <div>
          <span styleName={cx('is_black', num % this._divider === 0 && 'is_red')}>{num}</span>
          <button onClick={() => {this.props.add_num(1); }}>+</button>
          <button onClick={() => {this.props.minus_num(1); }}>-</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state:ReduxState) => ({
  demoState: state.demoState,
});
const mapDispatchToProps = (dispatch:any) => bindActionCreators({
  add_num,
  minus_num,
}, dispatch);

export const IndexContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);