import React, { useState, MouseEvent, Fragment, KeyboardEvent, ChangeEvent, useEffect } from 'react';
import './autocomplete.css';

type AutoCompleteProps = {
    name: string,
    suggestions: string[],
    onSelect: (item: string) => void
};

const AutoComplete = (props: AutoCompleteProps) => {
    const [activeSuggestion, setActiveSuggestion] = useState(0);
    const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
    const [userInput, setUserInput] = useState('');

    useEffect(() => {
        
    }, [filteredSuggestions, userInput, activeSuggestion])

    const onSuggestionClick = (event: MouseEvent<HTMLInputElement>) => {
        onSuggestionSelect(event.currentTarget.innerText);
    }

    const onSuggestionSelect = (name: string) => {
        setUserInput(name);
        setFilteredSuggestions([]);
        props.onSelect(name);
    }

    const suggestionsComponent = (
        <div className="autocomplete-items">
            {filteredSuggestions.map((item, index) => {
                return (
                    <div key={index}
                         className={index === activeSuggestion ? "autocomplete-active" : ""}
                         onClick={onSuggestionClick}>
                        {item}
                    </div>
                )
            })}
        </div>
    )
    
    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const input = event.currentTarget.value;
        const filtered = props.suggestions.filter(
            suggestion => suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
        );

        setUserInput(input);
        setFilteredSuggestions(filtered);
    }

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (filteredSuggestions.length === 0) {
            return;
        }

        if (event.keyCode === 13) {
            onSuggestionSelect(filteredSuggestions[activeSuggestion]);
        } else if (event.keyCode === 38) {
            if (activeSuggestion === 0) {
                return;
            }

            setActiveSuggestion(activeSuggestion - 1);
        } else if (event.keyCode === 40) {
            if (activeSuggestion === filteredSuggestions.length - 1) {
                return;
            }

            setActiveSuggestion(activeSuggestion + 1);
        }
    }

    return(
        <Fragment>
            <div className="autocomplete">
                <input
                    autoComplete="false"
                    className="autocomplete"
                    id="myInput"
                    type="text"
                    name={props.name}
                    placeholder="Start typing..."
                    required
                    onChange={onInputChange}
                    onKeyDown={onKeyDown}
                    value={userInput}
                    
                />
                {suggestionsComponent}
            </div>
        </Fragment>
    )
}

export default AutoComplete;