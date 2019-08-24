import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


const AntTab = withStyles(theme => ({
  root: {
    textTransform: 'none',
    minWidth: 72,
    padding: 0,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
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
    backgroundColor: theme.palette.background.paper,
  },
  tabs: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

export default function HorizontalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(props.active);
  const {labels, tabs} = props;
  React.useEffect(()=> setValue(props.active), [props.active, value]);
  return (
    <div className={classes.root}>
      
      <Tabs
        indicatorColor="primary"
        textColor="primary"
        
        // variant="scrollable"
        value={value}
        onChange={(_, value) => setValue(value)}
        // aria-label="Horizontal tabs example"
        className={classes.tabs}
        centered={props.centered}
      >
        {
          labels.map((label, index) => <AntTab label={label} key={index}  />)
        }
      
      </Tabs>
      
      {
        tabs.map((tab, index) =>
          <TabPanel
            
            style={{}}
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
