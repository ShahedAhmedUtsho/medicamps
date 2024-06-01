"use client";
import { useState } from "react";
import logo from "../../Assets/logo/logo-no-background.svg"
import {Link, NavLink} from "react-router-dom"
import { Avatar, Button ,Divider,Dropdown,Navbar} from "keep-react";
import { ChartPieSlice, Copy, Pen, Phone, SignOut, User, UserCircle, Users } from 'phosphor-react'








export const Header = () => {

  const   Links = <>
  
  

  <NavLink className="text-lg apple py-5 capitalize" to="/">Home</NavLink>
  <NavLink className="text-lg apple py-5 capitalize" to="/">Available Camps</NavLink>
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
         
          <Button size="sm" className="apple">
            Join us
          </Button>
       




          <Dropdown actionClassName="border-none py-0 bg-transparent "  action={  <Avatar size="lg" className="border-black bg-transparent text-black ">
           
           </Avatar>
 } className="z-50 ">
      <Dropdown.List>
        <Dropdown.Item>
          <User size={24} />
          
          Profile
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
        <Dropdown.Item>
          <SignOut size={24} />
          Logout
        </Dropdown.Item>
      </Dropdown.List>
    </Dropdown>






    
    
          <Navbar.Toggle />
        </Navbar.Container>
      </Navbar.Container>
    </Navbar>
  );
}

  export default Header