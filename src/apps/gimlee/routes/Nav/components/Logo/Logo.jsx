import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { AnimatePresence, motion } from 'framer-motion';
import { NavbarRouterLink } from 'gimlee-ui-components/Navbar';
import logoImageWhite from '../../../../assets/logo-white.svg';
import logoImageBlack from '../../../../assets/logo-black.svg';

const primaryLogo = {
  src: logoImageWhite,
  width: 120,
  height: 34,
  exitWidth: 71,
  exitHeight: 20,
};
const secondaryLogo = {
  src: logoImageBlack,
  width: 71,
  height: 20,
  exitWidth: 120,
  exitHeight: 34,
};

const Logo = ({ type }) => {
  const [scrolled, setScrolled] = useState();
  const logoData = type === 'landing' && !scrolled ? primaryLogo : secondaryLogo;
  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 65) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <NavbarRouterLink to="/" isLogo style={{ position: 'relative' }}>
        <AnimatePresence>
          <motion.img
            style={{ position: 'absolute', maxWidth: 'initial' }}
            key={logoData.src}
            src={logoData.src}
            initial={{
              left: 0, width: logoData.exitWidth, height: logoData.exitHeight, opacity: 0,
            }}
            animate={{
              left: 0, width: logoData.width, height: logoData.height, opacity: 1,
            }}
            exit={{
              left: 0, width: logoData.exitWidth, height: logoData.exitHeight, opacity: 0,
            }}
          />
        </AnimatePresence>
      </NavbarRouterLink>
    </div>
  );
};

Logo.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Logo;
