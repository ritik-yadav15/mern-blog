import React from 'react';

function Footer() {
  return (
    <>
     <div className="container  p-0" style={{ maxWidth: "100%" }}>
        <footer
          className="text-center text-lg-start text-white"
          style={{ backgroundColor: '#929fba' }}
        >
       

          <div
            className="text-center  p-3"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
          >
            © 2024 Copyright:
            <a className="text-white" href="https://mdbootstrap.com/" rel="noopener noreferrer">
              DemBlogs
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
