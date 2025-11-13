import Image from "next/image";
import styles from "../miniCards/miniCards.module.scss";

type MiniCardsProps = {
	label: string;
	title: string;
	icon: string;
	subTitle: string;
};
export const MiniCards: React.FC<MiniCardsProps> = ({
	label,
	title,
	icon,
	subTitle,
}: MiniCardsProps) => {
	return (
		<div className={styles.card}>
			<div className={styles.cardTop}>
				<p className={styles.label}>{label}</p>
			</div>
			<div className={styles.cardMiddle}>
				<p className={styles.title}>{title}</p>
				<Image
					src={icon}
					alt={icon}
					width={50}
					height={50}
				/>
			</div>
			<div className={styles.cardBottom}>
				<p className={styles.subTitle}>{subTitle}</p>
			</div>
		</div>
	);
};
