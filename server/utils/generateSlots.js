const generateSlots = () => {
  const slots = [];

  let currentHour = 10;
  let currentMinute = 0;

  while (
    currentHour < 17 ||
    (currentHour === 17 && currentMinute === 0)
  ) {
    if (currentHour === 13) {
      currentHour = 14;
      currentMinute = 0;
    }

    const startHour = currentHour
      .toString()
      .padStart(2, "0");

    const startMinute = currentMinute
      .toString()
      .padStart(2, "0");

    let endHour = currentHour;
    let endMinute = currentMinute + 30;

    if (endMinute === 60) {
      endHour += 1;
      endMinute = 0;
    }

    const formattedEndHour = endHour
      .toString()
      .padStart(2, "0");

    const formattedEndMinute = endMinute
      .toString()
      .padStart(2, "0");

    slots.push({
      startTime: `${startHour}:${startMinute}`,
      endTime: `${formattedEndHour}:${formattedEndMinute}`,
    });

    currentMinute += 30;

    if (currentMinute === 60) {
      currentHour += 1;
      currentMinute = 0;
    }
  }

  return slots;
};

module.exports = generateSlots;