import { q, quiz } from "./helpers.mjs";

export default {
  "react-vvedenie": quiz([
    q(
      "Что такое React?",
      "Библиотека для построения пользовательских интерфейсов",
      ["База данных", "Язык разметки", "Серверный фреймворк для API"],
    ),
    q(
      "Из чего состоит UI в React?",
      "Из компонентов",
      ["Из HTML-шаблонов PHP", "Только из CSS-модулей", "Из SQL-таблиц"],
    ),
  ]),
  "react-jsx": quiz([
    q(
      "Что такое JSX?",
      "Синтаксис, похожий на HTML, внутри JavaScript",
      ["Отдельный язык компиляции в браузер", "CSS-фреймворк", "База данных"],
    ),
    q(
      "Сколько корневых элементов должен возвращать компонент в современном React?",
      "Один (или Fragment)",
      ["Ровно три", "Любое количество без обёртки", "Только <div>"],
    ),
  ]),
  "react-komponenty-i-props": quiz([
    q(
      "Для чего нужны props?",
      "Передать данные от родителя в дочерний компонент",
      ["Хранить глобальный state Redux", "Подключить CSS", "Сделать HTTP-запрос без useEffect"],
    ),
    q(
      "Можно ли изменять props внутри дочернего компонента?",
      "Нет, props только для чтения",
      ["Да, через props.value = 1", "Да, через setProps", "Только в class components"],
    ),
  ]),
  "react-use-state": quiz([
    q(
      "Что возвращает useState(initial)?",
      "Массив [value, setValue]",
      ["Только value", "Объект { state, setState }", "Promise"],
    ),
    q(
      "Когда компонент перерисуется после setState?",
      "После обновления state React запланирует новый render",
      ["Синхронно до return", "Только при F5", "Никогда"],
    ),
  ]),
  "react-sobytiya": quiz([
    q(
      "Как передать обработчик клика в React?",
      "onClick={handleClick}",
      ["click={handleClick}", "on-click=\"handleClick\"", "handlerClick"],
    ),
    q(
      "Почему пишут onClick={() => fn(id)}, а не onClick={fn(id)}?",
      "Чтобы вызвать функцию позже по событию, а не сразу при render",
      ["Потому что React требует стрелку всегда", "Чтобы ускорить CSS", "Это синтаксис HTML"],
    ),
  ]),
  "react-uslovnyy-render": quiz([
    q(
      "Как условно показать блок в JSX?",
      "{isOpen && <Panel />}",
      ["<if condition>", "{if isOpen}<Panel />", "v-if"],
    ),
  ]),
  "react-spiski-i-keys": quiz([
    q(
      "Зачем key в списке элементов?",
      "Помочь React отличать элементы при обновлении",
      ["Для SEO", "Для CSS-класса", "Чтобы сортировать массив"],
    ),
    q(
      "Почему плохо использовать index как key при изменяемом списке?",
      "Может сломаться состояние элементов при вставке/удалении",
      ["React не рендерит список", "key обязан быть числом 0", "index запрещён спецификацией"],
    ),
  ]),
  "react-formy-controlled": quiz([
    q(
      "Что такое controlled input?",
      "Значение поля хранится в state и задаётся через value",
      ["Поле без value", "Только input type=hidden", "Форма без onSubmit"],
    ),
    q(
      "Как обновить текст в controlled input?",
      "onChange → setState(event.target.value)",
      ["input.value = ... напрямую без state", "document.querySelector", "reload страницы"],
    ),
  ]),
  "react-use-effect": quiz([
    q(
      "Для чего нужен useEffect?",
      "Побочные эффекты: запросы, подписки, работа с DOM",
      ["Создание JSX", "Объявление props", "Стилизация SCSS"],
    ),
    q(
      "Что делает пустой массив зависимостей []?",
      "Эффект выполнится один раз после монтирования",
      ["Каждый render", "Никогда", "Только при unmount без cleanup"],
    ),
  ]),
  "react-use-ref": quiz([
    q(
      "Для чего используют useRef?",
      "Хранить ссылку на DOM-элемент или мутабельное значение без перерисовки",
      ["Заменить useState всегда", "Подключить Redux", "Валидировать формы"],
    ),
  ]),
  "react-use-memo-use-callback": quiz([
    q(
      "Зачем useMemo?",
      "Кэшировать результат вычисления между рендерами",
      ["Мемоизировать компонент целиком всегда", "Заменить useEffect", "Хранить ref"],
    ),
    q(
      "Зачем useCallback?",
      "Вернуть стабильную ссылку на функцию между рендерами",
      ["Ускорить CSS", "Создать Promise", "Заменить useState"],
    ),
  ]),
  "react-context-api": quiz([
    q(
      "Для чего Context API?",
      "Передать данные глубоко вниз без prop drilling",
      ["Заменить React Router", "Хранить CSS", "Компилировать TypeScript"],
    ),
  ]),
  "react-router": quiz([
    q(
      "Какой компонент React Router рендерит дочерние маршруты?",
      "<Outlet />",
      ["<Route only>", "<Link>", "<Navigate only>"],
    ),
    q(
      "Чем Link отличается от <a href>?",
      "Делает клиентскую навигацию без полной перезагрузки SPA",
      ["Открывает новую вкладку всегда", "Работает только на сервере", "Ничем"],
    ),
  ]),
  "react-podnyatie-sostoyaniya": quiz([
    q(
      "Что значит «поднять state вверх»?",
      "Хранить общий state в ближайшем общем родителе",
      ["Переместить state в localStorage всегда", "Использовать только Redux", "Удалить props"],
    ),
  ]),
  "react-kompoziciya": quiz([
    q(
      "Что такое композиция компонентов?",
      "Сборка UI из маленьких переиспользуемых компонентов",
      ["Наследование class extends UI", "Копипаста HTML", "Один гигантский компонент"],
    ),
    q(
      "Что такое children в React?",
      "Содержимое, переданное между открывающим и закрывающим тегом компонента",
      ["Массив props только", "Список key", "Глобальный store"],
    ),
  ]),
  "react-custom-hooks": quiz([
    q(
      "Как должно начинаться имя пользовательского хука?",
      "С use, например useAuth",
      ["С get", "С on", "С handle"],
    ),
    q(
      "Зачем выносить логику в custom hook?",
      "Переиспользовать stateful-логику между компонентами",
      ["Ускорить CSS", "Заменить TypeScript", "Убрать JSX"],
    ),
  ]),
  "react-typescript": quiz([
    q(
      "Как типизировать props интерфейсом?",
      "interface Props { title: string }",
      ["props: any всегда", "type Props = string", "Props extends Component"],
    ),
  ]),
  "react-redux": quiz([
    q(
      "Где в Redux хранится глобальное состояние?",
      "В store",
      ["В props родителя", "В localStorage только", "В CSS-переменных"],
    ),
    q(
      "Как компонент читает данные из Redux?",
      "useSelector",
      ["useFetch", "useRef", "getElementById"],
    ),
  ]),
  "react-memo-optimizaciya": quiz([
    q(
      "Что делает React.memo?",
      "Пропускает лишний render, если props не изменились",
      ["Мемоизирует API-запрос", "Создаёт context", "Заменяет useState"],
    ),
  ]),
  "react-lazy-suspense": quiz([
    q(
      "Для чего React.lazy?",
      "Ленивая загрузка компонента по требованию",
      ["Ленивая загрузка CSS в head", "Отложенный setState", "Кэш localStorage"],
    ),
    q(
      "Что показывает <Suspense fallback={...}>?",
      "Запасной UI пока lazy-компонент грузится",
      ["Ошибку API", "404 страницу", "Только spinner в Redux"],
    ),
  ]),
  "react-error-boundaries": quiz([
    q(
      "Что ловит Error Boundary?",
      "Ошибки рендера в дочерних компонентах",
      ["Ошибки в event handlers автоматически", "Ошибки сети fetch", "Ошибки CSS"],
    ),
  ]),
  "react-portaly": quiz([
    q(
      "Для чего createPortal?",
      "Рендерить React-узел в другой DOM-контейнер, например в body",
      ["Создать новый роут", "Подключить Redux", "Скомпилировать JSX"],
    ),
  ]),
};
