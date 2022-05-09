import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Box from '@mui/material/Box';
import React from 'react';
import "./styles/drawer.scss";

function CartItem() {
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'left',
                    p: 1,
                    m: 1,
                }}
            >
                <a href="#" className='cart-image'>
                    <img src="https://cuahangtienloi24h.com/wp-content/uploads/2021/09/muc-la-e1632327615497-300x300.jpg" />
                </a>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginRight: "12px"
                }}>
                    <a href="#" className='cart-item-name'>Mực lá (2con/kg)</a>
                    <span className='cart-item-quantity'>1 × <span className='cart-price'>306,000 ₫</span></span>
                </Box>
                <Box sx={{
                    flexGrow: 1,
                    textAlign: 'right'
                }}>
                    <a href="#" className="cart-item-remove">
                        <CloseRoundedIcon fontSize='small'></CloseRoundedIcon>
                    </a>
                </Box>
            </Box>
        </>
    )
}

export default CartItem