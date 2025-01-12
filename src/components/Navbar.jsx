import React from 'react'

const Navbar = ({thememode, theme, title}) => {
    return (

        <>
            <nav className={`navbar navbar-expand-lg bg-${theme}`} data-bs-theme={theme}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">{title}</a>
                   
                    <div className="form-check form-switch">
                                <input className="form-check-input" onClick={thememode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
                            </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
