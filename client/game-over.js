const overlay = document.querySelector('.overlay');

export default function ({ obstacle, score }, callback) {
  const ctaText = obstacle.cta.type === 'petition' ? 'Sign the petition' : 'Donate';

  overlay.style.zIndex = 1;
  overlay.style.pointerEvents = 'inherit';
  overlay.innerHTML += '<div class="game_over">' +
    '<div class="game_over__image" style="background-position: ' + obstacle.position + '; background-image: url(' + obstacle.image.src + ')"></div>' +
    '<div class="game_over__copy">' +
    '<div class="game_over__score">Score: ' + score + '</div>' +
    '<div class="game_over__description"><div class="game_over__description__bold">Here\'s why you lost:</div> ' + obstacle.description + '</div>' +
    '<div class="game_over__ctas-header">And here\'s what can you do:</div>' +
    '<div class="game_over__ctas">' +
    '<div class="game_over__ctas__article"><a target="_blank" href="' + obstacle.article + '">Read the story</a></div>' +
    '<div class="game_over__ctas__action"><a target="_blank" href="' + obstacle.cta.link + '">' + ctaText + '</a></div>' +
    '<div class="game_over__ctas__play-again">Play again</div>' +
    '</div>' +
    '</div>' +
    '</div>';
  overlay.querySelector('.game_over__ctas__play-again').addEventListener('click', (e) => {
    overlay.style.zIndex = 'inherit';
    overlay.style.zIndex = 'none';

    e.preventDefault();
    callback();
  });
}
