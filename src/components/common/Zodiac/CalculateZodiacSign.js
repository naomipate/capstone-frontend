import { hover } from "@testing-library/user-event/dist/hover";
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
      zodiacSignName: "Aquarius",
      zodiacSign: <TbZodiacAquarius />,
      zodiacInfo: [
        "Innovative and Unique",
        "Humanitarian and Social Causes",
        "Intellectual Stimulation",
      ],
    },
    {
      zodiacSignName: "Pisces",
      zodiacSign: <TbZodiacPisces />,
      zodiacInfo: [
        "Creative and Imaginative",
        "Compassionate and Spiritual",
        "Sensitive and Emotional",
      ],
    },
    {
      zodiacSignName: "Aries",
      zodiacSign: <TbZodiacAries />,
      zodiacInfo: [
        "Adventure-Oriented",
        "Fitness and Activity",
        "Bold and Trendy Items",
      ],
    },
    {
      zodiacSignName: "Taurus",
      zodiacSign: <TbZodiacTaurus />,
      zodiacInfo: [
        "Luxurious and Comfortable",
        "Practical and Long-lasting",
        "Sensory Pleasures",
      ],
    },
    {
      zodiacSignName: "Gemini",
      zodiacSign: <TbZodiacGemini />,
      zodiacInfo: [
        "Intellectually Stimulating",
        "Communication and Tech Gadgets",
        "Versatile and Multi-interest Items",
      ],
    },
    {
      zodiacSignName: "Cancer",
      zodiacSign: <TbZodiacCancer />,
      zodiacInfo: [
        "Sentimental and Personalized",
        " Home and Family-Oriented",
        "Nurturing and Relaxation Gifts",
      ],
    },
    {
      zodiacSignName: "Leo",
      zodiacSign: <TbZodiacLeo />,
      zodiacInfo: [
        "Regal and Glamorous",
        "Celebration and Entertainment",
        "Personalized and Grand Gestures",
      ],
    },
    {
      zodiacSignName: "Virgo",
      zodiacSign: <TbZodiacVirgo />,
      zodiacInfo: [
        "Practical and Organized",
        "Health and Wellness",
        "Quality and Attention to Detail",
      ],
    },
    {
      zodiacSignName: "Libra",
      zodiacSign: <TbZodiacLibra />,
      zodiacInfo: [
        "Harmony and Aesthetics",
        "Social and Relationship-Oriented",
        "Balanced Decision-Making",
      ],
    },
    {
      zodiacSignName: "Scorpio",
      zodiacSign: <TbZodiacScorpio />,
      zodiacInfo: [
        "Intense and Passionate",
        "Deep Emotional Connections",
        "Mystery and Exploration",
      ],
    },
    {
      zodiacSignName: "Sagittarius",
      zodiacSign: <TbZodiacSagittarius />,
      zodiacInfo: [
        "Adventure and Exploration",
        "Optimism and Learning",
        "Freedom and Flexibility",
      ],
    },
    {
      zodiacSignName: "Capricorn",
      zodiacSign: <TbZodiacCapricorn />,
      zodiacInfo: [
        "Ambitious and Practical",
        "Quality and Longevity",
        "Organized and Responsible",
      ],
    },
  ];
  let month = dobDate.getMonth();
  let day = dobDate.getDate();
  // January is 0, December is 11, the smallest start date is the 19th.
  if (month === 0 && day <= 19) {
    month = 11;
  } else if (day < days[month]) {
    month--;
  }

  return (
    <>
      <div className="zodiac-sign-name">{signs[month].zodiacSignName}: </div>
      <div className="zodiac-sign">{signs[month].zodiacSign}</div>
      <div className="zodiac-info">
        {signs[month].zodiacInfo[0]}, {signs[month].zodiacInfo[1]},{" "}
        {signs[month].zodiacInfo[2]}
      </div>
    </>
  );
}

export default CalculateZodiacSign;
