import { TbZodiacAquarius } from "react-icons/tb";
import { TbZodiacPisces } from "react-icons/tb";
import { TbZodiacAries } from "react-icons/tb";
import { TbZodiacTaurus } from "react-icons/tb";
import { TbZodiacGemini } from "react-icons/tb";
import { TbZodiacCancer } from "react-icons/tb";
import { TbZodiacLeo } from "react-icons/tb";
import { TbZodiacVirgo } from "react-icons/tb";
import { TbZodiacLibra } from "react-icons/tb";
import { TbZodiacScorpio } from "react-icons/tb";
import { TbZodiacSagittarius } from "react-icons/tb";
import { TbZodiacCapricorn } from "react-icons/tb";

function CalculateZodiacSign(dobInMili) {
  let dobDate = new Date(dobInMili);
  const days = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
  const signs = [
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
  ];
  let month = dobDate.getMonth();
  let day = dobDate.getDate();
  // January is 0, December is 11, the smallest start date is the 19th.
  if (month === 0 && day <= 19) {
    month = 11;
  } else if (day < days[month]) {
    month--;
  }
  return signs[month];
}

export default CalculateZodiacSign;
