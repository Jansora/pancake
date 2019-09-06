import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles, useTheme, withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import SwipeableViews from 'react-swipeable-views';

const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    padding: 10,
    fontWeight: theme.typography.fontWeightRegular,
    // marginRight: theme.spacing(4),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),

  },
  selected: {},
}))(props => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      <Box >{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    backgroundColor: theme.palette.background.paper,
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export default function HorizontalTab(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const {labels, tabs} = props;
  return (
    <div className={classes.root}>
      
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        
        value={value}
        onChange={(_, value) => setValue(value)}
        className={classes.tabs}
        centered={props.centered}
      >
        {
          labels.map((label, index) => <AntTab label={label} key={index}  />)
        }
      
      </Tabs>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={value => setValue(value)}
      >
        {
          tabs.map((tab, index) =>
            <TabPanel
              key={index}
              index={index}
              value={value}
              // Tab失效时销毁掉, 再次点击时可以触发animation
              children={index === value && tab }
            />)
        }
      </SwipeableViews>
    </div>
  );
}
