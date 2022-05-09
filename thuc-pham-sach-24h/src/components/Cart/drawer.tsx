import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import CartItem from './CartItem';
import './styles/drawer.scss';

type Anchor = 'top' | 'left' | 'bottom' | 'right' ;

const useStyles = makeStyles({
    root: {

    },
    divider: {
        maxWidth: "30px",
        margin: "0 auto !important",
        border: "1px solid #292929 !important",
        marginBottom: "13px"
    }
});

export default function TemporaryDrawer() {
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const classes = useStyles();

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 330 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <div className='cart-inner'>
                <h4 className='cart-title'>Giỏ hàng</h4>
                <Divider className={classes.divider} />
                <CartItem />
                <CartItem />
                <p className='cart-total'>Tổng số phụ: <span className='cart-price'>306,000 ₫</span></p>
                <div className="cart-buttons">
                    <a href="/gio-hang" className='btn--primary'> Xem giỏ hàng</a>
                    <a href="/thanh-toan" className='btn--primary'>Thanh toán</a>
                </div>
            </div>
        </Box>
    );

    return (
        <div>
            {(['right'] as const).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}