import { fade, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%",
    },
    gridContent: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 150
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    secAppbarDesktop: {
        background: "#457b9d",
        overflow: "hidden",
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        borderTop: "5px solid #151b39",
        borderBottom: "5px solid #151b39"
    },
    secAppbarMobile: {
        background: "#151b39",
        position: "absolute",
        zIndex: 1,
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
        overflow: "hidden"
    },
    button: {
        color: "#FFF",
        width: 160
    },
    paperStyles: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width: 350,
        height: 200,
        margin: 10,
        borderTopLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    imageView: {
        width: 160,
        height: 133,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        margin: 2,
        cursor: 'pointer',

        "&:hover":{
            transform: 'scale(1.25)',
            transition: 'all 0.5s ease 0s',
        },
    },
    textStyles: {
        fontSize: 28,
        color: "#151b39",
        fontWeight: "normal",
        display: "flex",
        letterSpacing: 3,
        padding: 10,
        fontFamily: 'Georgia,Times,"Times New Roman", serif',
        justifyContent: "center"
    },
    textStyles2: {
        color: "#151b39",
        display: "flex",
        fontSize: 15,
        fontFamily: 'Georgia,Times,"Times New Roman", serif',
        justifyContent: "center"
    },
    root2: {
        flexGrow: 1,
        background: "#e63946",
        padding: 5
    },

    userData: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },

    gridContent2:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
    },
    rootFooter: {
        flexGrow: 1,
    },
    gridContentFooter:{
        display: "flex",
        background: "#252324",
    },
    heading:{
        fontSize: 14,
        color: "ivory",
        fontWeight:"bold"
    },
    divider: {
        background: "#fff",
    },
    contentLink: {
        fontSize: 14,
        color: "#FFF",
        marginTop: 10,
        "&:hover":{
            color: "brown",
            cursor: "pointer",
            transform: 'scale(1.25)',
            transition: 'all 0.5s ease 0s',
        }
    },
    activityHeading: {
        color: "#32aeb1",
        display: "flex",
        fontSize: 20,
        fontFamily: 'Georgia,Times,"Times New Roman", serif',
        justifyContent: "left"
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    paperstyle: {
        justifyContent: "flex-start",
        display: "flex",
        borderRadius: 10,
        flexDirection: "column",
        padding: 10,
        margin: 10,
        alignItems: "center"
    },

    imageview: {
        width: 160,
        height: 160,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        margin: 2,
        cursor: "pointer",
    },

    tsBtn: {
        background: "#FFF",
        fontSize: 14,
        fontFamily: "fantasy",
        margin: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid #252324",
        borderRadius: 5,
        height: 30,
        width: 110,
        cursor: "pointer"
    },
    tsBtnActive: {
        background: "#252324",
        color: "#FFF",
        fontSize: 14,
        fontFamily: "fantasy",
        fontWeight: "bold",
        margin: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid #252324",
        borderRadius: 5,
        height: 30,
        width: 110,
        cursor: "pointer"
    },
    tsBtnDisabled: {
        margin: 5,
        display: "flex",
        fontSize: 14,
        fontFamily: "fantasy",
        justifyContent: "center",
        alignItems: "center",
        border: "2px solid #252324",
        borderRadius: 5,
        height: 30,
        width: 110,
    },
    defaultAddress: {

    },
    address: {
        color: "#FFF",
        background: "#252324"
    },

    editBtnHover: {
        border: "2px solid #252324",
        background: "#FFF",
        color: "#252324",
        fontWeight: "bold",
        borderRadius: 15,
        width: 80,
        height: 30,
        "&:hover": {
            color: "#FFF",
            background: "#252324",
            // transform: 'scale(1.25)',
            // transition: 'all 0.5s ease 0s',
        }
    }

}));

export default useStyles;