import React from 'react';
import {
    AppBar,
    Button,
    Divider,
    Drawer,
    List,
    ListItem, ListItemText,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";
import {useHistory} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    title: {
        flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerContainer: {
        overflow: 'auto',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));

function Layout(props) {
    const classes = useStyles();
    const history = useHistory();

    const onLogout = () => {
      axios.post('/api/logout', null, {
          headers: {
              // Authorization: 'Bearer ' + localStorage.getItem('token'),
              // Accept: "application/json",
          }
      }).then(() => window.location.href = '/');
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        TodoList
                    </Typography>
                    <Button color="inherit" onClick={onLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open>
                        <div className={classes.toolbar} />
                        <Divider />
                        <List>
                            <ListItem button key="Today" onClick={() => history.push("/today_tasks")}>
                                <ListItemText primary="Today" />
                            </ListItem>
                            <ListItem button key="All Tasks" onClick={() => history.push("/all_tasks")}>
                                <ListItemText primary="All Tasks" />
                            </ListItem>
                        </List>
                        <Divider />
                        <List>
                            {['Projects'].map((text, index) => (
                                <ListItem button key={text}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
            </nav>

            <main className={classes.content}>
                <Toolbar />
                {props.children}
            </main>
        </div>
    );
}

export default Layout;
