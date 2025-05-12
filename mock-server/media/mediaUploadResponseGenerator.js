const fileNames = [
  '1c114c04-f8b3-4ee2-9edd-7a47fb504dfe.jpg',
  '30751513-eb59-4336-9f97-ed5314ea1f22.jpg',
  'd2e1b7fc-6ff6-11e8-adc0-fa7ae01bbebc.mp4',
];

module.exports = () => JSON.stringify({
  path: `/${fileNames[Math.floor(Math.random() * fileNames.length)]}`,
});
