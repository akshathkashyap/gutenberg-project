import CategoryLink from "../components/CategoryLink";
import Centralize from "../layouts/Centralize";
import FictionIcon from "../assets/Fiction.svg";
import DramaIcon from "../assets/Drama.svg";
import HumourIcon from "../assets/Humour.svg";
import PoliticsIcon from "../assets/Politics.svg";
import PhilosophyIcon from "../assets/Philosophy.svg";
import HistoryIcon from "../assets/History.svg";
import AdventureIcon from "../assets/Adventure.svg";

// shows select number of categories that the user has the option to browse
export default function Categories() {
	return (
		<div>
			<section className="w-full pt-12 px-4 pb-6 bg-[url('assets/Pattern.svg')] bg-no-repeat bg-cover">
				<Centralize>
					<h1 className='font-semibold text-5xl text-gutenberg-accent my-6'>
						Gutenberg Project
					</h1>
					<p className='font-semibold text-base'>
						A social cataloging website that allows you to freely
						search its database of books, annotations, and reviews.
					</p>
				</Centralize>
			</section>
			<section className='w-full p-4 md:mt-4'>
				<Centralize>
					<span className='relative flex flex-col md:flex-row gap-4 md:gap-6'>
						<ul className='flex flex-col gap-4 md:gap-6 w-full md:w-1/2'>
							<li>
								<CategoryLink
									name='fiction'
									iconSrc={FictionIcon}
								/>
							</li>
							<li>
								<CategoryLink
									name='drama'
									iconSrc={DramaIcon}
								/>
							</li>
							<li>
								<CategoryLink
									name='humour'
									iconSrc={HumourIcon}
								/>
							</li>
							<li>
								<CategoryLink
									name='politics'
									iconSrc={PoliticsIcon}
								/>
							</li>
						</ul>
						<ul className='flex flex-col gap-4 md:gap-6 w-full md:w-1/2'>
							<li>
								<CategoryLink
									name='philosophy'
									iconSrc={PhilosophyIcon}
								/>
							</li>
							<li>
								<CategoryLink
									name='history'
									iconSrc={HistoryIcon}
								/>
							</li>
							<li>
								<CategoryLink
									name='adventure'
									iconSrc={AdventureIcon}
								/>
							</li>
						</ul>
					</span>
				</Centralize>
			</section>
		</div>
	);
}
