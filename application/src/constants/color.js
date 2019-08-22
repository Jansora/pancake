export const colorArray = [
  'red',
  'orange',
  'yellow',
  'olive',
  'green',
  'teal',
  'blue',
  'violet',
  'purple',
  'pink',
  'brown',
  'grey',
];

export const getRandomColor = () => colorArray[Math.floor(Math.random() * colorArray.length)];