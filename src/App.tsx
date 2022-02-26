import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './theme';
import Login from './app/Login';
import ShoutBox from './app/ShoutBox';
import { SocketContext, socket } from './context/socket.context';
import { UserContext } from './context/user.context';
import { IUser } from './model/User';
import { RoomContext } from './context/room.context';

function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [roomUsers, setRoomUsers] = useState<IUser[]>([]);

  return (
    <ThemeProvider theme={theme}>
      <UserContext.Provider value={{ user, setUser }}>
        <RoomContext.Provider value={{ roomUsers, setRoomUsers }}>
          <SocketContext.Provider value={socket}>
            <CssBaseline />
            {!user && <Login />}
            {user && (
              <ShoutBox />
            )}
          </SocketContext.Provider>
        </RoomContext.Provider>
      </UserContext.Provider>
    </ThemeProvider>
  );
}

export default App;
