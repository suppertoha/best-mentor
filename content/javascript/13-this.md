# this

`this` — ссылка на контекст вызова функции. Его значение зависит от того, **как** вызвали функцию, а не где она объявлена.

## this в методе объекта

```js
const user = {
  name: "Иван",
  sayHi() {
    console.log(`Привет, ${this.name}`);
  },
};

user.sayHi(); // Привет, Иван
```

## Потеря контекста

Если метод передать как колбэк, `this` может стать `undefined` (в strict mode) или глобальным объектом.

```js
const user = {
  name: "Иван",
  sayHi() {
    console.log(this.name);
  },
};

const fn = user.sayHi;
// fn(); // ошибка или пусто

const bound = user.sayHi.bind(user);
bound(); // Иван
```

## call, apply, bind

```js
function greet(greeting) {
  console.log(`${greeting}, ${this.name}`);
}

const person = { name: "Мария" };

greet.call(person, "Привет");
greet.apply(person, ["Здравствуй"]);

const greetMaria = greet.bind(person);
greetMaria("Хай");
```

## Стрелочные функции и this

У стрелок нет своего `this` — они берут `this` из окружающей области. В классах React-компонентов это редко нужно благодаря хукам.

```js
const obj = {
  value: 42,
  regular() {
    setTimeout(function () {
      // this не obj
      console.log(this);
    }, 0);
  },
  arrow() {
    setTimeout(() => {
      console.log(this.value); // 42
    }, 0);
  },
};
```

В ES6 появился синтаксис `class` — он строится поверх прототипов, но читается привычнее.
