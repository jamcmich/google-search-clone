/* Utilities */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateValue } from '@contexts/StateProvider';
import { actionTypes } from '@contexts/reducer';
import Tooltip from '@components/tooltip/Tooltip';

/* Assets */
import { Clear, Mic, Search } from '@components/icons/Icons';

/* Styles */
import './SearchForm.css';

const SearchForm = () => {
	const navigate = useNavigate();
	const [{ input, theme }, dispatch] = useStateValue();
	const [searchInput, setSearchInput] = useState('');

	const submitForm = (event) => {
		event.preventDefault();

		if (searchInput.trim() && searchInput !== input) {
			dispatch({
				type: actionTypes.SET_SEARCH_INPUT,
				input: searchInput,
			});

			if (location.pathname !== '/google-search-clone/results') navigate('/google-search-clone/results');
		}
	};

	const handleChange = (event) => {
		setSearchInput(event.target.value);
	};

	const clearInput = () => {
		setSearchInput('');
	};

	const prependSearchInput = () => {
		if (input && location.pathname === '/google-search-clone/results')
			setSearchInput(
				input
					.toLowerCase()
					.trim()
					.replace(/[\W_]+/g, ' ')
			);
	};

	useEffect(() => {
		prependSearchInput();
	}, []);

	return location.pathname === '/google-search-clone/results' ? (
		<form className='search-page__form results' onSubmit={submitForm}>
			<div className={`search-page__form-group results ${theme}`}>
				<input
					className={`search-page__input results ${theme}`}
					type='text'
					value={searchInput}
					onChange={handleChange}
				/>

				<Tooltip
					content='Clear'
					direction='bottom'
					type='sharp'
					name='clear'
				>
					<Clear
						callClearInput={clearInput}
						style='results'
						size={22}
					/>
				</Tooltip>

				<span className={`search-page__span results ${theme}`}></span>

				<Tooltip
					content='Search by Voice'
					direction='bottom'
					type='sharp'
				>
					<Mic style='results' size={22} />
				</Tooltip>

				<Search style='results' size={22} />
			</div>
		</form>
	) : (
		<form className='search-page__form' onSubmit={submitForm}>
			<div className={`search-page__form-group ${theme}`}>
				<Search style='search' />
				<input
					className={`search-page__input ${theme}`}
					type='text'
					value={searchInput}
					onChange={handleChange}
				/>

				<Tooltip
					content='Clear'
					direction='bottom'
					type='sharp'
					name='clear'
				>
					<Clear callClearInput={clearInput} style='search' />
				</Tooltip>

				<span className={`search-page__span ${theme}`}></span>

				<Tooltip
					content='Search by Voice'
					direction='bottom'
					type='sharp'
				>
					<Mic style='search' />
				</Tooltip>
			</div>

			<div className='search-form__buttons'>
				<button
					className={`search-form__button ${theme}`}
					type='submit'
					onClick={submitForm}
				>
					Google Search
				</button>
				<button
					className={`search-form__button ${theme}`}
					type='submit'
					onClick={submitForm}
				>
					I'm Feeling Lucky
				</button>
			</div>
		</form>
	);
};

export default SearchForm;
