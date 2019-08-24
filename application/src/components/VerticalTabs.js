import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <Typography
      component='div'
      style={{padding: "0 0 0 0"}}
      {...other}
    >
      <Box p={3} style={{paddingTop: 0}}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    key: index,
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    // flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    // flexWrap: 'nowrap',
    // overflow: 'visible',
    // width: '100%',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    // flexGrow: 2,
  },
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.active ? props.active : 0);
  const {labels, tabs} = props;
  
  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={(_, value) => setValue(value)}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {
          labels.map((label, index) => <Tab label={label} {...a11yProps(index)} />)
        }
   
      </Tabs>
      {
        tabs.map((tab, index) =>
          <TabPanel
            style={{width: '100%',  display: index === value ? 'block' : 'none'}}
            key={index}
            index={index}
            value={value}
            // Tab失效时销毁掉, 再次点击时可以触发animation
            children={index === value && tab }
          />)
      }
    </div>
  );
}
