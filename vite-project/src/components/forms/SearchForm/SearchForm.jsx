import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdSearch as Search } from 'react-icons/io';

import { useStateValue } from '@contexts/StateProvider';
import { actionTypes } from '@contexts/Reducer';
import { Microphone, Clear } from '@components/tooltips/Tooltips';

import './SearchForm.css';

const SearchForm = () => {
	const navigate = useNavigate();
	const [{ input, theme }, dispatch] = useStateValue();
	const [searchInput, setSearchInput] = useState('');
	const [style, setStyle] = useState('');

	const submitForm = (event) => {
		event.preventDefault();

		console.log('submitForm()');

		if (searchInput && searchInput !== input) {
			dispatch({
				type: actionTypes.SET_SEARCH_INPUT,
				input: searchInput,
			});

			if (location.pathname !== '/search') navigate('/search');
		}
	};

	const handleChange = (event) => {
		setSearchInput(event.target.value);
	};

	const clearInput = () => {
		console.log('clearInput()');
		setSearchInput('');
	};

	const prependSearchInput = () => {
		document.querySelector('.results-form__input').value = input;
	};

	const handleStyles = () => {
		switch (location.pathname) {
			case '/':
				console.log('search-page__icon');
				setStyle('search')
				break;
			case '/search':
				console.log('results-page__icon');
				setStyle('results')
				break;
			default:
				console.log('no styles could be applied');
				break;
		}
	};

	useEffect(() => {
		if (input && location.pathname === '/search') prependSearchInput();
		handleStyles();
	}, []);

	return location.pathname === '/search' ? (
		<form className='results-page__form' onSubmit={submitForm}>
			<div className='results-page__form-group'>
				<input
					className='results-page__input'
					type='text'
					value={searchInput}
					onChange={handleChange}
				/>
				<Clear
					clearInput={clearInput}
					setTheme={theme}
					setStyle={style}
				/>
				<span className='results-page__span'></span>
				<Microphone setTheme={theme} setStyle={style} />
				<Search className='results-page__icon' />
			</div>
		</form>
	) : (
		<form className='search-page__form' onSubmit={submitForm}>
			<div className='search-page__form-group'>
				<Search className='search-page__icon' />
				<input
					className='search-page__input'
					type='text'
					value={searchInput}
					onChange={handleChange}
				/>
				<Clear
					clearInput={clearInput}
					setTheme={theme}
					setStyle={style}
				/>
				<span className='search-page__span'></span>
				<Microphone setTheme={theme} setStyle={style} />
			</div>

			<div className='search-form__buttons'>
				<button
					className='search-form__button'
					type='submit'
					onClick={submitForm}
				>
					Google Search
				</button>
				<button className='search-form__button'>
					I'm Feeling Lucky
				</button>
			</div>
		</form>
	);
};

export default SearchForm;
