import React, { useContext, useEffect, useState } from 'react'
import { AppBar, IconButton, Toolbar, Dawer, Button, Avatar, useMediaQuery, Drawer } from '@mui/material'
import { Menu, AccountCircle, Brightness4, Brightness7 } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { useDispatch, useSelector } from 'react-redux'

import { ColorModeContext } from '../../utils/ToggleColorMode'
import { setUser, userSelector } from '../../features/auth'
import { Sidebar, Search } from '..'

import { fetchToken, createSessionId, moviesApi } from '../../utils'
import useStyles from './styles'

const NavBar = () => {

  const { isAuthenticated, user } = useSelector(userSelector)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width: 600px)')
  const theme = useTheme()
  const dispatch = useDispatch()
  const classes = useStyles({theme})

  const colorMode = useContext(ColorModeContext)

  const token = localStorage.getItem('request_token')
  const sessionIdFromLocalStorage = localStorage.getItem('session_id')

  useEffect(() => {
    const loginUser = async () => {
      if (!token) return 

      if(sessionIdFromLocalStorage) {
        const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`)

        dispatch(setUser(userData))
      } else {
        const sessionId = await createSessionId()

        const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`)

        dispatch(setUser(userData))
      }
    }

    loginUser()
  }, [token])

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
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button 
                color="inherit" 
                component={Link} 
                to={`/profile/${user.id}`} 
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