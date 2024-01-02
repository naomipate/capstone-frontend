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
    },
    {
      zodiacSignName: "Pisces",
      zodiacSign: <TbZodiacPisces />,
    },
    {
      zodiacSignName: "Aries",
      zodiacSign: <TbZodiacAries />,
    },
    {
      zodiacSignName: "Taurus",
      zodiacSign: <TbZodiacTaurus />,
    },
    {
      zodiacSignName: "Gemini",
      zodiacSign: <TbZodiacGemini />,
    },
    {
      zodiacSignName: "Cancer",
      zodiacSign: <TbZodiacCancer />,
    },
    {
      zodiacSignName: "Leo",
      zodiacSign: <TbZodiacLeo />,
    },
    {
      zodiacSignName: "Virgo",
      zodiacSign: <TbZodiacVirgo />,
    },
    {
      zodiacSignName: "Libra",
      zodiacSign: <TbZodiacLibra />,
    },
    {
      zodiacSignName: "Scorpio",
      zodiacSign: <TbZodiacScorpio />,
    },
    {
      zodiacSignName: "Sagittarius",
      zodiacSign: <TbZodiacSagittarius />,
    },
    {
      zodiacSignName: "Capricorn",
      zodiacSign: <TbZodiacCapricorn />,
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
      {signs[month].zodiacSignName}: {signs[month].zodiacSign}
    </>
  );
}

export default CalculateZodiacSign;
