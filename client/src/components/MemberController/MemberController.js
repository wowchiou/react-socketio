import React from 'react';
import { createUseStyles } from 'react-jss';

import User from './User/User';
import Member from './Member/Member';

const MemberController = () => {
  const css = useStyles();
  const memberList = [
    {
      name: '皮卡丘',
      avatar: 'https://pkq.herokuapp.com/static/Icon/25.png',
      message: '你好壓',
      time: '下午 02:43'
    },
    {
      name: '皮卡丘',
      avatar: 'https://pkq.herokuapp.com/static/Icon/25.png',
      message: '你好壓',
      time: '下午 02:43'
    }
  ];

  return (
    <div className={css['memberController']}>
      <div className={css['user']}>
        <User />
      </div>
      <ul className={css['members']}>
        {memberList.map(itm => (
          <Member
            avatar={itm.avatar}
            message={itm.message}
            name={itm.message}
            time={itm.time}
          />
        ))}
      </ul>
    </div>
  );
};

const useStyles = createUseStyles(theme => ({
  memberController: {
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.8)'
  },
  member: {
    height: '100%'
  }
}));

export default MemberController;
