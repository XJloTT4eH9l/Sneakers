import { useState } from 'react';
import './Search.scss';

function Search({ placeholder }) {
    const [value, setValue] = useState('');

    const onInputChange = (e) => {
        setValue(e.target.value);
    }

    const onClear = (e) => {
        setValue('');
    }
    return (
        <div className="search">
            <h2 className="search__title">{value ? `Поиск по запросу "${value}"` : 'Все кроссовки'}</h2>
            <div className='search__block'>
                <input
                    className="search__input"
                    onChange={onInputChange}
                    value={value}
                    placeholder={placeholder}
                />
                <img className='search__img' src="img/search.svg" alt="search" />
                {value && <img className='search__delete' src="img/delete.svg" alt="clear" onClick={onClear} />}
            </div>
          </div>
    )
}

export default Search;