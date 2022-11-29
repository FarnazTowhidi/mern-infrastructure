import React from 'react'
import { Link } from 'react-router-dom';
import * as userService from "../../utilities/users-service" 

function NavBar(props) {
  function handleLogOut() {
    userService.logOut();
    props.setUser(null);
  }
  return (
    <nav>
      <Link to="/orders">Order History</Link>
      &nbsp; | &nbsp;
      <Link to="/orders/new">New Order</Link>
      &nbsp; | &nbsp;
      <Link to="" onClick={handleLogOut}>Log Out</Link>
      &nbsp; | &nbsp;
      {props.user && <span>{props.user.name}</span>}
    </nav>
  )
}

export default NavBar