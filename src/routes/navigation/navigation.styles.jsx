import styled from "styled-components";

import { Link } from "react-router-dom";

export const NavigationContainer = styled.div`
	height: 70px;
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-bottom: 25px;
`;

export const LogoContainer = styled(Link)`
	height: 100%;
	width: 100px;
	padding: 10px;
	margin-bottom: 50px;
`;

export const Brand = styled.span`
	font-size: 1.5rem;
	color: darkgray;
	&:hover {
		color: black;
	}
	justify-self: center;
	align-self: center;
	margin-left: 500px;
	display: flex;
`;

export const NavLinks = styled.div`
	width: 50%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

export const NavLink = styled(Link)`
	padding: 10px 15px;
	cursor: pointer;
`;
