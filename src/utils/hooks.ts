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

// https://usehooks.com/useWindowSize/
export function useWindowSize() {
	// Initialize state with undefined width/height so server and client renders match
	// Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
	const [windowSize, setWindowSize] = useState<{
		width?: number;
		height?: number;
	}>({
		width: undefined,
		height: undefined,
	});
	useEffect(() => {
		// Handler to call on window resize
		function handleResize() {
			// Set window width/height to state
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight,
			});
		}
		// Add event listener
		window.addEventListener("resize", handleResize);
		// Call handler right away so state gets updated with initial window size
		handleResize();
		// Remove event listener on cleanup
		return () => window.removeEventListener("resize", handleResize);
	}, []); // Empty array ensures that effect is only run on mount
	return windowSize;
}

// https://github.com/JohannesKlauss/react-fps/blob/master/src/useFps.ts
export function useFps(windowWidth = 10) {
	const lastFpsValues = useRef<number[]>([]);
	const frames = useRef(0);
	const prevTime = useRef(performance.now());
	const animRef = useRef(0);
	const [fps, setFps] = useState<number[]>([]);

	const calcFps = () => {
		const t = performance.now();

		frames.current += 1;

		if (t > prevTime.current + 1000) {
			const elapsedTime = t - prevTime.current;

			const currentFps = Math.round((frames.current * 1000) / elapsedTime);

			lastFpsValues.current = lastFpsValues.current.concat(currentFps);

			if (elapsedTime > 1500) {
				for (let i = 1; i <= (elapsedTime - 1000) / 1000; i++) {
					lastFpsValues.current = lastFpsValues.current.concat(0);
				}
			}

			lastFpsValues.current = lastFpsValues.current.slice(
				Math.max(lastFpsValues.current.length - windowWidth, 0),
			);

			setFps(lastFpsValues.current);

			frames.current = 0;
			prevTime.current = performance.now();
		}

		animRef.current = requestAnimationFrame(calcFps);
	};

	useEffect(() => {
		animRef.current = requestAnimationFrame(calcFps);

		return () => {
			cancelAnimationFrame(animRef.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const avgFps = fps.reduce((a, b) => a + b, 0) / fps.length;
	const maxFps = Math.max.apply(Math.max, fps);
	const currentFps = fps[fps.length - 1];

	return { fps, avgFps, maxFps, currentFps };
}
