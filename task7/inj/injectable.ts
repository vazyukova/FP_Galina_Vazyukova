// Глобальный список инстансов классов
const instancesMap = new Map<string, any>();

function Injectable({ key }: { key: string }) {
  return <T extends { new (...args: any[]): {} }>(target: T) => {
    const instance = new target();
    instancesMap.set(key, instance);
    return target;
  };
}

function Inject(key: string) {
  return (target: any, propertyKey: string) => {
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      get(this: any) {
        return instancesMap.get(key);
      },
    });
  };
}

@Injectable({ key: "myService1" })
class MyService {
  message = 'Hello, World!';
}

class MyClass1 {
  @Inject("myService1")
  service!: MyService;

  printMessage() {
    console.log(this.service.message);
  }
}

@Injectable({key: "myService2"})
class MyService2{
    message = "Hello again!";
}

class MyClass2 {
  @Inject("myService2")
  service!: MyService2;

  printMessage() {
    console.log(this.service.message);
  }
}

const instance1 = new MyClass1();
instance1.printMessage(); // Вывод: Hello, World!

const instance2 = new MyClass2();
instance2.printMessage(); // Вывод: Hello again!