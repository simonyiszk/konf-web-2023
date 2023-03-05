export const TRACKING_ID = "7f571a75-d09b-4869-a1ae-03c45a22fdeb";

export const FB_EVENT_LINK = "https://fb.me/e/3gYKLOUiz";

console.log(
	"eventbrite link",
	process.env.EVENTBRITE_LINK,
	typeof process.env.EVENTBRITE_LINK,
);
export const EVENTBRITE_LINK = process.env.EVENTBRITE_LINK
	? process.env.EVENTBRITE_LINK
	: "https://simonyi-konferencia.eventbrite.com";
