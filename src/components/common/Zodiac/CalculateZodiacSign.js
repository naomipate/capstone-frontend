import {
  TbZodiacAquarius,
  TbZodiacPisces,
  TbZodiacAries,
  TbZodiacTaurus,
  TbZodiacGemini,
  TbZodiacCancer,
  TbZodiacLeo,
  TbZodiacVirgo,
  TbZodiacLibra,
  TbZodiacScorpio,
  TbZodiacSagittarius,
  TbZodiacCapricorn,
} from "react-icons/tb";

function CalculateZodiacSign({ dobInMili }) {
  let dobDate = new Date(dobInMili);
  const days = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
  const signs = [
    {
      zodiacSign: <TbZodiacAquarius />,
      zodiacInfo: ["Innovative and Unique", "Humanitarian and Social Causes", "Intellectual Stimulation"],
    },
    {
       zodiacSign: <TbZodiacPisces />,
    zodiacInfo: ["Creative and Imaginative", "Compassionate and Spiritual", "Sensitive and Emotional" ] 
  },
    {
       zodiacSign: <TbZodiacAries />,
    zodiacInfo: ["Adventure-Oriented", "Fitness and Activity", "Bold and Trendy Items"] 
  },
    {
       zodiacSign: <TbZodiacTaurus />,
    zodiacInfo: ["Luxurious and Comfortable", "Practical and Long-lasting", "Sensory Pleasures" ] 
  },
    {
       zodiacSign: <TbZodiacGemini />,
    zodiacInfo: ["Intellectually Stimulating", "Communication and Tech Gadgets", "Versatile and Multi-interest Items"] 
  },
    {
       zodiacSign: <TbZodiacCancer />,
    zodiacInfo: [ "Sentimental and Personalized", " Home and Family-Oriented", "Nurturing and Relaxation Gifts" ] 
  },
    {
       zodiacSign: <TbZodiacLeo />,
    zodiacInfo: [ "Regal and Glamorous", "Celebration and Entertainment", "Personalized and Grand Gestures" ] 
  },
    {
       zodiacSign: <TbZodiacVirgo />,
    zodiacInfo: [ "Practical and Organized", "Health and Wellness", "Quality and Attention to Detail"] 
  },
    {
       zodiacSign: <TbZodiacLibra />,
    zodiacInfo: ["Harmony and Aesthetics", "Social and Relationship-Oriented", "Balanced Decision-Making"] 
  },
    {
       zodiacSign: <TbZodiacScorpio />,
    zodiacInfo: ["Intense and Passionate", "Deep Emotional Connections", "Mystery and Exploration"] 
  },
    {
       zodiacSign: <TbZodiacSagittarius />,
    zodiacInfo: ["Adventure and Exploration", "Optimism and Learning", "Freedom and Flexibility"] 
  },
    {
       zodiacSign: <TbZodiacCapricorn />,
    zodiacInfo: ["Ambitious and Practical", "Quality and Longevity", "Organized and Responsible"] 
  }
  ];
  let month = dobDate.getMonth();
  let day = dobDate.getDate();
  // January is 0, December is 11, the smallest start date is the 19th.
  if (month === 0 && day <= 19) {
    month = 11;
  } else if (day < days[month]) {
    month--;
  }
  
  return <>
  {signs[month].zodiacSign} 
  {signs[month].zodiacInfo} 
  </>;
}

export default CalculateZodiacSign;
