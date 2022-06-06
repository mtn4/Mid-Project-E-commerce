function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
const generateOrderNumber = () => {
  return getRandomInt(10000, 100000);
};

export default generateOrderNumber;
