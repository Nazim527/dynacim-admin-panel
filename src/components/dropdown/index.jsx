import React from "react";
import "./style.scss";


const clickOutsideRef = (content_ref,toggle_ref) => {
    document.addEventListener('mousedown', (e) => {
        if(toggle_ref.current && toggle_ref.current.contains(e.target)) {
            content_ref.current.classList.toggle('active')
        } else {
            if(content_ref.current && !content_ref.current.contains(e.target)) {
                content_ref.current.classList.remove('active')
            }
        }
    })
}
const Dropdown = ({ 
    icon, 
    badge, 
    cusstomToggle, 
    contentData,
    renderItems,
    renderFooter,
 }) => {
  const dropdown_toggle_el = React.useRef(null)
  const dropdown_content_el = React.useRef(null)

  clickOutsideRef(dropdown_content_el, dropdown_toggle_el)
  return (
    <div className="dropdown">
      <button className="dropdown_toggle" ref={dropdown_toggle_el}>
        {icon ? <i className={icon}></i> : ""}
        {badge ? <span className="dropdown_toggle-badge">{badge}</span> : ""}
        {cusstomToggle ? cusstomToggle() : ""}
      </button>

      <div className="dropdown_content" ref={dropdown_content_el}>
        {contentData && renderItems
          ? contentData.map((item, index) => renderItems(item, index))
          : ""}
        {renderFooter ? (
          <div className="dropdown_footer">{renderFooter()}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Dropdown;
