fetch('https://api.pokemontcg.io/v1/cards?page=2>')
  .then(response => response.json())
  .then(data => console.log(data));


  https://dziedziuch.samurajprogramowania.pl/projects/2-pokemon/