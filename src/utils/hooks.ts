import { useEffect, useMemo, useRef, useState } from "react";

// https://gist.github.com/kyleshevlin/08a2deb904b79077e46966567ccabf06
export function useBool(initialState = false): [
	boolean,
	{
		setTrue: () => void;
		setFalse: () => void;
		toggle: () => void;
		reset: () => void;
	},
] {
	const [state, setState] = useState(initialState);

	// Instead of individual React.useCallbacks gathered into an object
	// Let's memoize the whole object. Then, we can destructure the
	// methods we need in our consuming component.
	const handlers = useMemo(
		() => ({
			setTrue: () => {
				setState(true);
			},
			setFalse: () => {
				setState(false);
			},
			toggle: () => {
				setState((s) => !s);
			},
			reset: () => {
				setState(initialState);
			},
		}),
		[initialState],
	);

	return [state, handlers];
}

export function useLocalStorage<T>(key: string, initialValue: T) {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState<T>(() => {
		if (typeof window === "undefined") {
			if (process.env.NODE_ENV !== "production") {
				// eslint-disable-next-line no-console
				console.warn("No window yet in useLocalStorage");
			}
			return initialValue;
		}
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			// If error also return initialValue
			// eslint-disable-next-line no-console
			console.error(error);
			return initialValue;
		}
	});
	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value: T | ((val: T) => T)) => {
		if (typeof window === "undefined") {
			if (process.env.NODE_ENV !== "production") {
				// eslint-disable-next-line no-console
				console.warn("No window yet in useLocalStorage");
			}
			return;
		}
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
			// eslint-disable-next-line no-console
			console.error(error);
		}
	};
	return [storedValue, setValue] as const;
}

export function useEffectOnce(fn: () => void) {
	const ref = useRef(false);
	useEffect(() => {
		if (!ref.current) {
			fn();
		}
		return () => {
			ref.current = true;
		};
	}, [fn]);
}
