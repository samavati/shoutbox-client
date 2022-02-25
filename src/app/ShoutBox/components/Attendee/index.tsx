import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { ListChildComponentProps } from 'react-window';
import { IAttendee } from '../../../../model/Attendee';

interface AttendeeProps extends ListChildComponentProps<IAttendee[]> {

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