import styled from "styled-components";

import Button from "../button/button.component";

export const CartDropdownContainer = styled.div`
	position: absolute;
	width: 250px;
	height: 350px;
	display: flex;
	flex-direction: column;
	padding: 20px;
	border: 1px solid black;
	background-color: white;
	top: 90px;
	right: 40px;
	z-index: 5;

	// WHENEVER ANY OF THESE BUTTONS GETS RENDERED INSIDE OF
	// THE CART-DROPDOWNCONTAINER (ARE CHILDREN), WE WANT TO
	// APPLY THE FOLLOWING STYLES TO THEM (IN ADDITION TO
	// THEIR BASE STYLES)
	${Button} {
		margin-top: auto;
	}
`;

export const EmptyMessageContainer = styled.span`
	font-size: 18px;
	margin: 50px auto;
`;

export const CartItemsContainer = styled.div`
	height: 240px;
	display: flex;
	flex-direction: column;
	overflow: scroll;
`;
