import React from 'react'
import './style.scss'
import sidebar_items from '../../helpers/JsonData/sidebar_routes.json'

import logoIcon from '../../assets/Logo.png'
import { Link,useLocation } from 'react-router-dom'


const SideBarItem = ({active, icon, title}) => {
  return (
    <div className="sideBar_item">
      <div className={`sideBar_item-inner ${active ? 'active' : ""}`}>
        <i className={icon}></i>
        <span>
          {title}
        </span>
      </div>
    </div>
  )
}

const SideBar = () => {
  const location = useLocation()
  const activeItem = sidebar_items.findIndex(item => item.route === location.pathname)

  return (
    <div className='sidebar'>
      <Link to='/'>
      <div className="sidebar_logo">
        <img src={logoIcon} alt="" />
      </div>
      </Link>
      <div className="sidebar_content">
        {sidebar_items.map((item,index) => {
          return (
            <Link to={item.route} key={index}>
              <SideBarItem
                title={item.display_name}
                icon={item.icon}
                active={index == activeItem}
              />
            </Link>
          )
        })}
      </div>

    </div>
  )
}

export default SideBar

