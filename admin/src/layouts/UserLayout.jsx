import Link from 'umi/link';
import React from 'react';
import {connect} from 'dva';

import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    children,
  } = props;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <span className={styles.title}>Pancake 个人博客</span>
              </Link>
            </div>
            <div className={styles.desc}/>
          </div>
          {children}
        </div>

      </div>
    </>
  );
};

export default connect(({settings}) => ({...settings}))(UserLayout);
