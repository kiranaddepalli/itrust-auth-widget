import { Avatar, Box, Icon, styled } from '@mui/material'

// Creates a styled icon in the background
export const BackgroundIcon = styled(Icon)(( props) => ({
    position: "absolute",
    color: props.color || 'white',
    right: props.right || 0,
    bottom: props.bottom || 10,
    fontSize: props.fontSize || 100,
    opacity: props.opacity || 0.2, 
}))

export const BackgroundImage = styled(Box)(( props) => ({
    position: "absolute",
    backgroundImage : `url(${props.path})`,
    backgroundSize: 'cover',
    right: props.right || 0,
    bottom: props.bottom || 0,
    width: props.width || 100,
    height: props.height || 100,
    fontSize: props.fontSize || 100,
    opacity: props.opacity || 0.2, 
}))


// Creates a styled box with a background image
export const BackgroundBox = styled(Box)(( props) => ({
    position: "absolute",
    backgroundImage : `url(${props.path})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    height: props.height || 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: props.color || 'white',
    fontSize: props.fontSize || 100,
    opacity: props.opacity || 0.2, 
    
}))
