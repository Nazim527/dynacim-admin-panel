import React from 'react'
import './style.scss'
import Dropdown from '../dropdown'
import notifactions from '../../helpers/JsonData/notification.json';
import user_menu from '../../helpers/JsonData/user_menus.json'
import { Link } from 'react-router-dom';



const curr_user = {
  display_name: "Rzayev Nazim",
  image: 'bx bx-user-circle'
}

const renderNotifactions = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
)

const renderUserToggle = (user) => (
  <div className="topnav_right-user">
    <div className="topnav_right-user_image">
      <i className={user.image}></i>
    </div>
    <div className="topnav_right-user_name">
      {user.display_name}
    </div>
  </div>
)

const renderUserMenu = (item,index) => (
  <Link to='/' key={index}>
    <div className="notification-item">
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Link>
)
const TopNav = () => {
  return (
    <div className='topnav'>
      <div className="topnav_search">
        <input type="text" placeholder='Search here...'/>
        <i className='bx bx-search'></i>
      </div>

      <div className="topnav_right">
        <div className="topnav_right_item">
          {/* Dropdown here */}
          <Dropdown
          cusstomToggle={() => renderUserToggle(curr_user)}
          contentData={user_menu}
          renderItems={(item,index) => renderUserMenu(item,index)}/>
        </div>
        <div className="topnav_right_item">
          <Dropdown
          icon="bx bx-bell"
          badge={"12"}
          contentData={notifactions}
          renderItems={(item,index) => renderNotifactions(item,index)}
          renderFooter={() => <Link to="/">View All</Link>}
          /> 
          {/* Dropdown here */}
        </div>
        <div className="topnav_right_item">
          {/* Theme settings */}
        </div>
      </div>
    </div>
  )
}

export default TopNav