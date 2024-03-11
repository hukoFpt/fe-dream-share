export default function AboutLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex flex-col items-center justify-center gap-4 py-5 md:py-5">
			<div className="inline-block max-w-[1000px] text-center justify-center">
				{children}
			</div>
		</section>
	);
}
