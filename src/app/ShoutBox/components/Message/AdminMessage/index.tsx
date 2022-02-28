import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import React from 'react';

interface AdminMessageProps {
    adminMessage: any
}

const AdminMessage: React.FC<AdminMessageProps> = ({ adminMessage }) => {
    
    return (
        <Box display="flex" justifyContent="center">
            <Typography variant="caption">{adminMessage.message}</Typography>
        </Box>
    );
}

export default AdminMessage;