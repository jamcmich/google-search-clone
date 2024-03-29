import React from 'react';
import { Link } from 'react-router-dom';

import { useStateValue } from '@contexts/StateProvider';
import leaf from '@assets/images/leaf.png';

import './HomeFooter.css';

const HomeFooter = () => {
	const [{ theme }] = useStateValue();

	return (
		<footer className={`home-footer home-footer ${theme}`}>
			<nav className='home-footer__nav home-footer__nav-left'>
				<Link className='home-footer__link' to=''>
					Advertising
				</Link>
				<Link className='home-footer__link' to=''>
					Business
				</Link>
				<Link className='home-footer__link hide' to=''>
					How Search Works
				</Link>

				<Link className='home-footer__link show' to=''>
					About
				</Link>
			</nav>

			<nav className='home-footer__nav home-footer__nav-center'>
				<a
					className='home-footer__link-center'
					href='https://sustainability.google/carbon-free/?utm_source=googlehpfooter&utm_medium=housepromos&utm_campaign=bottom-footer&utm_content=#home'
					target='_blank'
				>
					<img
						className='home-footer__image'
						src={leaf}
						alt='carbon neutral'
					/>
					Carbon neutral since 2007
				</a>
			</nav>

			<nav className='home-footer__nav home-footer__nav-right'>
				<Link className='home-footer__link' to=''>
					Privacy
				</Link>
				<Link className='home-footer__link' to=''>
					Terms
				</Link>
				<Link className='home-footer__link' to=''>
					Settings
				</Link>
			</nav>
		</footer>
	);
};

export default HomeFooter;
