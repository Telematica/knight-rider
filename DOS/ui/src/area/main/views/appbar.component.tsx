import React from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import GridOnIcon from '@material-ui/icons/GridOn';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import PersonIcon from '@material-ui/icons/Person';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import { Link, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { AppRoutesContainer } from './app-routes.container';

const customHistory = createBrowserHistory();
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      background: 'linear-gradient(to left,#038bbb,#5232C2)',
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      backgroundImage: 'url(/NuevoleonB.jpg)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPositionX: '-170px',
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
      background: '#5232C2',
      '& button': {
        color: '#FFF',
      },
    },
    drawerHeaderMargin: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      // marginLeft: -drawerWidth,
      overflowX: 'auto',
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    imageLogo: {
      height: 'auto',
      width: '75%',
    },
    imageGobMx: {
      height: '2.2em',
      width: 'auto',
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);

export function AppBarComponent() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const breadcrumbNameMap: { [key: string]: { [key: string]: any } } = {
    audit: {
      url: '/audit/list',
      text: 'Auditorías',
      icon: <AccountBalanceIcon />,
      open: true,
    },
    observationSfp: {
      url: '/observation-sfp/list',
      text: 'Observaciones SFP',
      icon: <ImageSearchIcon />,
      open: true,
    },
    observationAsf: {
      url: '/observation-asf/list',
      text: 'Observaciones Preliminares ASF',
      icon: <ImageSearchIcon />,
      open: true,
    },
    resultsReport: {
      url: '/results-report/list',
      text: 'Observaciones de la ASF (Informe de Resultados)',
      icon: <ImageSearchIcon />,
      open: true,
    },
    observationAsenl: {
      url: '/observation-asenl/list',
      text: 'Observaciones Preliminares ASENL',
      icon: <ImageSearchIcon />,
      open: true,
    },
    resultsReportAsenl: {
      url: '/results-report-asenl/list',
      text: 'Observaciones de la ASENL (Informe de Resultados)',
      icon: <ImageSearchIcon />,
      open: true,
    },
    observationCytg: {
      url: '/observation-cytg/list',
      text: 'Observaciones Preliminares CyTG',
      icon: <ImageSearchIcon />,
      open: true,
    },
    resultsReportCytg: {
      url: '/results-report-cytg/list',
      text: 'Observaciones de la CYTG (Informe de Resultados)',
      icon: <ImageSearchIcon />,
      open: true,
    },
    reports: {
      url: '/reports',
      text: 'Reportes',
      icon: <GridOnIcon />,
      open: false,
      childrenList: [
        {
          url: '/reports-53',
          text: 'Reporte 53',
          icon: <NoteAddIcon />,
        },
        {
          url: '/reports-54',
          text: 'Reporte 54',
          icon: <NoteAddIcon />,
        },
      ],
    },
    user: {
      url: '/user/list',
      text: 'Usuarios',
      icon: <PersonIcon />,
      open: false,
    },
  };

  const [menuItems, setMenuItemOpen] = React.useState<{[key: string]: boolean}>(
    Object.keys(breadcrumbNameMap).reduce((acc, next) => {
      return { ...acc, [next]: !!breadcrumbNameMap[next].open }
    }, {})
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <img className={classes.imageGobMx} src="/nlgobmx.png" alt="Inicio" />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        // variant="temporary"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClose={handleDrawerClose}
      >
        <div className={classes.drawerHeader}>
          <img className={classes.imageLogo} src="/ll3.png" alt="Logo" />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <Router history={customHistory}>
          <List>
            {Object.keys(breadcrumbNameMap).map((route, index) => (
              <React.Fragment key={`${index + 1}`}>
                <ListItem
                  button
                  component={Link}
                  to={breadcrumbNameMap[route].url}
                  // key={route}
                  onClick={(event: any) =>{
                    if (!breadcrumbNameMap[route].childrenList) {
                      handleDrawerClose();
                    } else {
                      event.preventDefault();
                    }
                    setMenuItemOpen({
                      ...menuItems,
                      [route]: !menuItems[route],
                    })
                  }}
                >
                  <ListItemIcon>{breadcrumbNameMap[route].icon}</ListItemIcon>
                  <ListItemText primary={breadcrumbNameMap[route].text} />
                  { breadcrumbNameMap[route].childrenList && (menuItems[route] ? <ExpandLess /> : <ExpandMore />)}
                </ListItem>
                  {breadcrumbNameMap[route].childrenList && breadcrumbNameMap[route].childrenList.length > 0 && (
                  <Collapse in={menuItems[route]} timeout="auto" unmountOnExit>
                    <>
                      {Object.keys(breadcrumbNameMap[route].childrenList).map(
                        (route2, index2) => (
                          <List
                            component="div"
                            disablePadding
                            key={`${index2 + 1}`}
                          >
                            <ListItem
                              button
                              className={classes.nested}
                              component={Link}
                              to={
                                breadcrumbNameMap[route].childrenList[index2]
                                  .url
                              }
                              onClick={handleDrawerClose}
                            >
                              <ListItemIcon>
                                {
                                  breadcrumbNameMap[route].childrenList[index2]
                                    .icon
                                }
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  breadcrumbNameMap[route].childrenList[index2]
                                    .text
                                }
                              />
                            </ListItem>
                          </List>
                        ),
                      )}
                    </>
                  </Collapse>
                  )}
              </React.Fragment>
            ))}
          </List>
        </Router>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeaderMargin} />
        <AppRoutesContainer history={customHistory} />
      </main>
    </div>
  );
}
