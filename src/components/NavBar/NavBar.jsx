import React, { useState } from 'react'
import { AppBar, IconButton, Toolbar, Dawer, Button, Avatar, useMediaQuery, Drawer } from '@mui/material'
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { Sidebar, Search } from '..'

import useStyles from './styles'

const NavBar = () => {

  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 600px)')
  const theme = useTheme()
  const classes = useStyles({theme})
  const isAuthenticated = true

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar sx={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              sx={{...classes.menuButton, outline: 'none'}}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              className={classes.men}
            >

              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button 
                color="inherit" 
                component={Link} 
                to={`/profile/:id`} 
                sx={classes.linkButton} 
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar 
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src='https://i.pravatar.cc/300'
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <classes.Drawer>
              {isMobile ? (
                <Drawer
                  variant="temporary"
                  anchor="right"
                  open={mobileOpen}
                  onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
                  classes={{ paper: classes.drawerPaper }}
                  ModalProps={{ keepMounted: true }}
                >
                  <Sidebar setMobileOpen={setMobileOpen} />
                </Drawer>
              ) : (
                <Drawer classes={{ paper: classes.drawerPaper }} variant="permanent" open>
                  <Sidebar setMobileOpen={setMobileOpen} />
                </Drawer>
              )}
        </classes.Drawer>
      </div>
    </>
  )
}

export default NavBar