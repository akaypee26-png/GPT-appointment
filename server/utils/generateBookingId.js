const generateBookingId = () => {
  const randomNumber = Math.floor(
    100000 + Math.random() * 900000
  );

  return `APT-${randomNumber}`;
};

module.exports = generateBookingId;