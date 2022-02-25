import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListChildComponentProps } from 'react-window';
import { IUser } from '../../../../model/User';

interface AttendeeProps extends ListChildComponentProps<IUser[]> {

}

const Attendee: React.FC<AttendeeProps> = ({ style, data, index }) => {

    const item = data[index];

    return (
        <ListItem key={item.id} style={style} component="div" disablePadding>
            <ListItemButton>
                <ListItemText primary={item.name} />
            </ListItemButton>
        </ListItem>
    );
}

export default Attendee;