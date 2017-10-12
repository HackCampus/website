const Letters = require('./letters')

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('hackcampus-letters')
  const letters = new Letters(container, 'HACKCAMPUS', 'black')
});
