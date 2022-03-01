import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListChildComponentProps } from 'react-window';
import { IUser } from '../../../../model/User';

interface UserProps extends ListChildComponentProps<IUser[]> {

}

/**
 * Shows each users in the list of online users
 */
const User: React.FC<UserProps> = ({ style, data, index }) => {

    const item = data[index];

    return (
        <ListItem key={item.id} style={style} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={item.name} />
            </ListItemButton>
        </ListItem>
    );
}

export default User;