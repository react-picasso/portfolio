"use client";

import { useSectionInView } from "@/lib/hooks";
import React from "react";
import SectionHeading from "@/components/section-heading";
import { skillsData } from "@/lib/data";
import { motion } from "framer-motion";

const fadeInAnimationVariants = {
	initial: {
		opacity: 0,
		y: 100,
	},
	animate: (index: number) => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: 0.05 * index,
		},
	}),
};

export default function Skills() {
	const { ref } = useSectionInView("Skills", 0.5);

	return (
		<section
			id="skills"
			ref={ref}
			className="mb-28 max-w-[53rem] scroll-mt-28 text-center sm:mb-40"
		>
			<SectionHeading>My skills</SectionHeading>
			<ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-800">
				{skillsData.map((skill, index) => (
					<motion.li
						key={index}
						className="bg-white border border-black/10 rounded-xl px-5 py-3 dark:bg-white/10 dark:text-white/80"
						variants={fadeInAnimationVariants}
						initial="initial"
						animate="animate"
						viewport={{
							once: true,
						}}
						custom={index}
					>
						{skill}
					</motion.li>
				))}
			</ul>
		</section>
	);
}
