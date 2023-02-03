import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";

type OverlayFooterProps = { title: string };

export function OverlayFooter({ title }: OverlayFooterProps) {
	return (
		<div className="bottom-0 mb-4 flex w-full justify-center  text-lg text-white">
			{title}
		</div>
	);
}

type OverlayNextProps = {
	canNext: boolean;
	gotoNext: () => void;
};

export function OverlayNext({ canNext, gotoNext }: OverlayNextProps) {
	return (
		<button
			className="z-50 inline-block p-2 transition-all active:scale-75 disabled:opacity-50"
			type="button"
			disabled={!canNext}
			onClick={() => gotoNext()}
		>
			<FaChevronRight className="h-8 w-8 text-white drop-shadow-md transition-all hover:scale-125 sm:h-12 sm:w-12" />
		</button>
	);
}

type OverlayPreviousProps = {
	canPrev: boolean;
	gotoPrevious: () => void;
};

export function OverlayPrevious({
	canPrev,
	gotoPrevious,
}: OverlayPreviousProps) {
	return (
		<button
			className="z-50 inline-block p-2 transition-all active:scale-75 disabled:opacity-50"
			type="button"
			disabled={!canPrev}
			onClick={() => gotoPrevious()}
		>
			<FaChevronLeft className="h-8 w-8 text-white drop-shadow-md transition-all hover:scale-125 sm:h-12 sm:w-12" />
		</button>
	);
}

type OverlayHeaderProps = {
	setOpen: (open: boolean) => void;
};

export function OverlayHeader({ setOpen }: OverlayHeaderProps) {
	return (
		<button
			className="absolute top-2 right-2 z-50 inline-block p-2 transition-all active:scale-75 disabled:opacity-50"
			type="button"
			onClick={() => setOpen(false)}
		>
			<FaTimes className="h-8 w-8 text-white drop-shadow-md transition-all hover:scale-125 sm:h-12 sm:w-12" />
		</button>
	);
}
