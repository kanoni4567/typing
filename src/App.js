import { useState } from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import TypingWindow from './components/TypingWindow';

import * as themes from './themes.json'

const apis = ['https://meowfacts.herokuapp.com/', 'https://api.kanye.rest'];

const defaultTheme = themes["oceanNext"];

function useLocalStorage(key, initialValue) {
    // State to store our value
    // Pass initial state function to useState so logic is only executed once
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Get from local storage by key
            const item = window.localStorage.getItem(key);
            // Parse stored json or if none return initialValue
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            // If error also return initialValue
            console.log(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that ...
    // ... persists the new value to localStorage.
    const setValue = value => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            // A more advanced implementation would handle the error case
            console.log(error);
        }
    };

    return [storedValue, setValue];
}

function App() {
    const [theme, setTheme] = useLocalStorage('theme', defaultTheme);
    return (
        <div
            css={css`
                background-color: ${theme.backgroundColor};
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: center;
                text-align: center;
            `}
        >
            <h2
                css={css`
                    margin: 2rem 0;
                    @media (min-width: 420px) {
                        margin-bottom: 6rem;
                    }
                    /* position: absolute;
                    top: 0; */
                    color: ${theme.titleColor};
                `}
            >
                Cat Facts & Kanye Quotes
            </h2>
            <TypingWindow apis={apis} theme={theme} />
        </div>
    );
}

export default App;
