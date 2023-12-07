const { Observable } = rxjs;

const countdownObservable = new Observable((observer) => {
  let count = 5;
  const interval = setInterval(() => {
    observer.next(count);
    count--;

    if (count === 0) {
      clearInterval(interval);
      observer.error('Все!');
      observer.complete();
    }
  }, 1000);
});

const countdownObserver = {
  next: (value) => alert(value),
  error: (error) => alert(error),
  complete: () => console.log('Завершено'),
};

countdownObservable.subscribe(countdownObserver);