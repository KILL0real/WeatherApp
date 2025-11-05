import Image from "next/image";
import { title } from "process";
import styles from "./scoreCards.module.scss";

type CardProps = {
	title: string;
	description: string;
	details: string;
	image: string;
	footerPosition: "center" | "default";
	type: "wind" | "uv" | "humidity" | "visibility";
};
export const Card: React.FC<CardProps> = ({
	title,
	image,
	description,
	details,
	footerPosition = "default",
}: CardProps) => {
	return (
		<div className={styles.card}>
			<h3 className={styles.title}>{title}</h3>
			<Image
				src={image}
				alt={title}
				className={styles.icon}
				width={262}
				height={126}
			/>
			<div className={styles.descWrapper}>
				{footerPosition === "center" ? (
					<span className={styles.desc}> {description}</span>
				) : (
					<>
						<span className={styles.desc}> {description}</span>

						<span className={styles.det}>
							<Image
								src="/images/icons/eye.svg"
								alt="eye"
								width={24}
								height={24}
							/>
							{details}
						</span>
					</>
				)}
			</div>
		</div>
	);
};
