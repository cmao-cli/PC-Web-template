import * as React from 'react';
import { connect } from 'react-redux';
import * as cx from 'classnames';
import { bindActionCreators } from 'redux';

import { ReduxState } from 'src/redux/root_reducer';
import { RoomState, fetch_list } from 'src/redux/room';
import { fetchUser, selectUserName } from 'src/redux/user';
import { selectUserRoom } from 'src/redux/room';
// 从map_state_to_props和map_dispatch_to_props返回值推断出组件的props
type StoreState = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

interface IndexProps extends StoreState {};

class Index extends React.PureComponent<IndexProps> {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    const { list, userName, userRoom } = this.props;
    return (
      <div>
        <h1>当前用户为：{userName}</h1>
        <button onClick={() => { this.props.fetch_list() }}>点击获取房间数据</button>
        <div>
          {
            <>
              <p>用户预定的房间名字为： { userRoom && userRoom.name}</p>
              <p>用户预定的房间描述为： {userRoom && userRoom.description}</p>
            </>
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state:ReduxState) => ({
  list:state.RoomState,
  userName: selectUserName(state.userState),
  userRoom: selectUserRoom(state)
});
const mapDispatchToProps = (dispatch:any) => bindActionCreators({
  fetch_list,
  fetchUser
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);