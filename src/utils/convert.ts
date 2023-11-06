export function romanize(num: number) {
	if (!+num) {
		return false;
	}
	const digits = String(+num).split("");
	const key = [
		"",
		"C",
		"CC",
		"CCC",
		"CD",
		"D",
		"DC",
		"DCC",
		"DCCC",
		"CM",
		"",
		"X",
		"XX",
		"XXX",
		"XL",
		"L",
		"LX",
		"LXX",
		"LXXX",
		"XC",
		"",
		"I",
		"II",
		"III",
		"IV",
		"V",
		"VI",
		"VII",
		"VIII",
		"IX",
	];
	let roman = "";
	let i = 3;
	// eslint-disable-next-line no-plusplus
	while (i--) {
		// @ts-expect-error: digits will always have at least one element
		roman = (key[+digits.pop() + i * 10] || "") + roman;
	}
	return Array(+digits.join("") + 1).join("M") + roman;
}

export function parseYoutubeIdFromLink(url: string | undefined) {
	if (!url) {
		return undefined;
	}
	const regex =
		/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
	const parsed = url.match(regex);
	if (parsed) {
		return parsed[1];
	}
	return undefined;
}
