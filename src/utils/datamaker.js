function datamaker (lyrics) {
  const words = lyrics.split(/\s/)
  const data = [];
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (words[i].toLowerCase() === words[j].toLowerCase()) {
        data.push({ x: i, y: j})  
      }
    }
  }
  return {data, ticks: words}
}

export default datamaker;