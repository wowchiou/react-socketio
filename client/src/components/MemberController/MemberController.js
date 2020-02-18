import React from 'react';
import { createUseStyles } from 'react-jss';

import User from './User/User';
import Member from './Member/Member';

const MemberController = ({ memberList }) => {
  const css = useStyles();
  const clientData = JSON.parse(localStorage.getItem('pokemonChat'));

  return (
    <div className={css['memberController']}>
      <div className={css['user']}>
        <User />
      </div>
      <ul className={css['members']}>
        {memberList &&
          memberList.map((itm, idx) => {
            if (itm.id === clientData.id) return;
            return (
              <Member
                key={itm.name + idx}
                avatar={itm.avatar}
                message={itm.message}
                userName={itm.userName}
                time={itm.time}
              />
            );
          })}
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
