"use client";

import { useState } from "react";
import RainChart from "../components/_components/rainChart/rainChart";
import { MiniCards } from "../components/_components/weatherComponents/miniCards/miniCards";
import { Card } from "../components/_components/weatherComponents/scoreCards/scoreCards";
import WeatherTabs from "../components/_components/weatherComponents/weatherTabs/weatherTabs";
import styles from "./page.module.scss";

const cards = [
   {
    title:"wind status",
    image:"/images/icons/WindSatusRectangle.svg",
    description:"7.5 km/h",
    details:"6.20 AM",
    type:"wind"as const ,
    id:"wind-1",
   },
   {
    title:"UV index",
    image:"/images/Icons/UVindexCircle.svg",
    description:"5.5 UV",
    details:"",
    type:"uv"as const,
    id:"uv-1",
    footerPosition: "center"
   },
   {title:"Humidity",
    image:"/images/Icons/Vector.svg",
    description:"84%",
    details:"The dew point is 27° right now", 
    type:"humidity" as const,
    id:"hum-1"
   },
   {
    title:"visibility",
    image:"/images/Icons/VisibilityIcon1.svg",
    description:"04 km",
    details:"Haze is affecting visibility",
    type:"visibility"as const,
    id:"vis-1"   
   }



]
const miniCards =[
    {
        label:"Dubai",
        title:"Beijing",
        icon:"/images/icons/Rainy.svg",
        subTitle:"Cloudy",
        id:"1"
    },
     {
        label:"US",
        title:"California",
        icon:"/images/icons/Windy.svg",
        subTitle:"Windly",
        id:"2"
    },
     {
        label:"Dubai",
        title:"Arab Emirates",
        icon:"/images/Icons/Sunny2.svg",
        subTitle:"Mostly Sunny",
        id:"3"
    },
     {
        label:"Canada",
        title:"Charlottetown",
        icon:"/images/icons/LightSnowShower1.svg",
        subTitle:"Light SnowShower",
        id:"4"
    }

]
export default function HomePage() {
    const [activeTab, setActiveTab] = useState<"today" | "tomorrow" | "week">("week");
  return (
    <main className={styles.weather}>
      <div className={styles.weather__wrapper}>
        <div className={styles.firstSection}>
        <WeatherTabs activeTab={activeTab} setActiveTab={setActiveTab}  />
        <RainChart view={activeTab} />
         </div>


        
        <div className={styles.secondSection}>
            <div className={styles.sectionItem}>
            <h3 className={styles.sectionTitle}>Today's Overview</h3>
        <div className={styles.sectionButtons}> 
            <button className={`${styles.sectionButton} ${styles.large} `}>Other Cities</button>
            <button className={`${styles.sectionButton} ${styles.small}`}>See All</button>
        </div>
      </div>
            <div className={styles.secondSectionWrapper}>
            
       
       <div className={styles.scoreCards}>
        {cards.map((card)=>(
         <Card key={card.id} {...card}/>
        ))}
       </div>
       <div className={styles.bigCard}>
        <div>
             <h3 className={styles.cardTitle}>Explore global map of wind <br /> 
           weather and ocean condition </h3>
           </div>
       <div className={styles.buttonItem}>
        <button className={styles.cardButton}>GET STARTED</button>
        </div>

       
       </div>
       <div className={styles.miniCards}>
         {miniCards.map((miniCards)=>(
             <MiniCards key={miniCards.id}{...miniCards}/>
           ))}
       </div>
       
      </div>
     </div>
      </div>
    </main>
  );
}
