const { fromEvent, merge } = rxjs;

const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');
const button3 = document.getElementById('button3');

const button1Stream = fromEvent(button1, 'click');
const button2Stream = fromEvent(button2, 'click');
const button3Stream = fromEvent(button3, 'click');

const mergedStream = merge(button1Stream, button2Stream, button3Stream);

mergedStream.subscribe(() => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  document.body.style.backgroundColor = '#' + randomColor;
});