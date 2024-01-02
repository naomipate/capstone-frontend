import React from "react";

function ZodiacInfo({ dobInMili }) {
  let dobDate = new Date(dobInMili);
  const days = [20, 19, 21, 20, 21, 21, 23, 23, 23, 23, 22, 22];
  const signs = [
    {
      zodiacInfo: [
        "Innovative and Unique",
        "Humanitarian and Social Causes",
        "Intellectual Stimulation",
      ],
    },
    {
      zodiacInfo: [
        "Creative and Imaginative",
        "Compassionate and Spiritual",
        "Sensitive and Emotional",
      ],
    },
    {
      zodiacInfo: [
        "Adventure-Oriented",
        "Fitness and Activity",
        "Bold and Trendy Items",
      ],
    },
    {
      zodiacInfo: [
        "Luxurious and Comfortable",
        "Practical and Long-lasting",
        "Sensory Pleasures",
      ],
    },
    {
      zodiacInfo: [
        "Intellectually Stimulating",
        "Communication and Tech Gadgets",
        "Versatile and Multi-interest Items",
      ],
    },
    {
      zodiacInfo: [
        "Sentimental and Personalized",
        " Home and Family-Oriented",
        "Nurturing and Relaxation Gifts",
      ],
    },
    {
      zodiacInfo: [
        "Regal and Glamorous",
        "Celebration and Entertainment",
        "Personalized and Grand Gestures",
      ],
    },
    {
      zodiacInfo: [
        "Practical and Organized",
        "Health and Wellness",
        "Quality and Attention to Detail",
      ],
    },
    {
      zodiacInfo: [
        "Harmony and Aesthetics",
        "Social and Relationship-Oriented",
        "Balanced Decision-Making",
      ],
    },
    {
      zodiacInfo: [
        "Intense and Passionate",
        "Deep Emotional Connections",
        "Mystery and Exploration",
      ],
    },
    {
      zodiacInfo: [
        "Adventure and Exploration",
        "Optimism and Learning",
        "Freedom and Flexibility",
      ],
    },
    {
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
      {signs[month].zodiacInfo[0]}, {signs[month].zodiacInfo[1]},{" "}
      {signs[month].zodiacInfo[2]}
    </>
  );
}

export default ZodiacInfo;
