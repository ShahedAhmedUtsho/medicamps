"use client";

import logo from "../../Assets/logo/logo-no-background.svg"
import { Link, NavLink} from "react-router-dom"
import { Avatar, Button ,Divider,Dropdown,Navbar} from "keep-react";
import { ChartPieSlice, Copy, Gauge, Pen, Phone, SignOut, User, UserCircle } from 'phosphor-react'
import { useContext } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";








export const Header = () => {
const {user,logOut} = useContext(AuthContext);

  const   Links = <>
  
  

  <NavLink className="text-lg apple py-5 capitalize" to="/">Home</NavLink>
  <NavLink className="text-lg apple py-5 capitalize" to="/available-camps">Available Camps</NavLink>
  <NavLink className="text-lg apple py-5 capitalize" to="/">Home</NavLink>
  <NavLink className="text-lg apple py-5 capitalize" to="/">Home</NavLink>
  <NavLink className="text-lg apple py-5 capitalize" to="/">Home</NavLink>
  
  
  </>
  return (
    <Navbar fluid={true} className="bg-transparent header  px-0     ">
      <Navbar.Container className="flex bg-transparent   items-center justify-between">
        
        <Navbar.Container className="flex  items-center">
          <Navbar.Brand>
            <img
              src={logo}
              alt="keep"
             className=" w-40  "
            />
          </Navbar.Brand>
          <Navbar.Divider></Navbar.Divider>
          <Navbar.Container
            tag="ul"
            className="lg:flex hidden  items-center justify-between   gap-8"
          >
              {Links}
          </Navbar.Container>
          <Navbar.Collapse collapseType="sidebar">
            <Navbar.Container tag="ul" className="flex flex-col gap-5">
             {Links}
            </Navbar.Container>
          </Navbar.Collapse>
        </Navbar.Container>

        <Navbar.Container className="flex gap-5">
         {
user? <Dropdown actionClassName="border-none py-0 bg-transparent "  action={ user? <img src={user?.photoURL} className="w-10 h-10 object-cover rounded-full border-2 border-blue-500" /> :  <Avatar  className="border-black object-cover w-10 h-10 justify-center  bg-transparent text-black ">
           
</Avatar>
} className="z-50 ">



<Dropdown.List>
<Dropdown.Item>

  <Link className="w-full h-full flex gap-2" to="/profile">
  <User size={24} />Profile
</Link>


</Dropdown.Item>
<Dropdown.Item>

  <Link className="w-full h-full flex gap-2" to="/dashboard">
  <Gauge size={24} /> Dashboard
</Link>


</Dropdown.Item>


<Dropdown.Item>
<Phone size={24} />
Phone
</Dropdown.Item>
<Dropdown.Item>
<ChartPieSlice size={24} />
Statistics
</Dropdown.Item>
<Divider />
<Dropdown.Item>
<Pen size={24} />
Rename
</Dropdown.Item>
<Dropdown.Item>
<Copy size={24} />
Duplicate
</Dropdown.Item>
<Divider />
<Dropdown.Item>
<UserCircle size={24} />
Account
</Dropdown.Item>
<Dropdown.Item onClick={logOut}>
<SignOut  size={24} />
Logout
</Dropdown.Item>
</Dropdown.List>
</Dropdown>
: <Link to="/login"> <Button size="sm" className="apple  ">
Join us
</Button></Link>

          
         }
        




          





    
    
          <Navbar.Toggle />
        </Navbar.Container>
      </Navbar.Container>
    </Navbar>
  );
}

  export default Header