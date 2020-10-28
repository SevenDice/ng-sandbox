# Angular Sandbox

 **Ссылки**
 
 - [Angular GitBook RU](https://angular-ru.gitbook.io/blog/)
 - [Angular Cheatsheet](https://angular.io/guide/cheatsheet)
 - [Awesome Angular RU](https://github.com/Angular-RU/angular-awesome-list)
 - [Awesome Angular EN](https://github.com/PatrickJS/awesome-angular)
 
 **Компоненты**

Компонент управляет отображением представления на экране, в ее основе используется Shadow DOM по умолчанию \(для создания инкапсулированного визуального поведения\). Как правило, компоненты используются для создания простого виджета в пользовательском интерфейсе, в то же время они могут представлять из себя набор еще более простых компонентов внутри себя \(для увеличения абстракции и создания простых функциональных виджетов внутри приложения\).

```javascript
@Component({
  selector: 'html-name-element'
})
export class MyComponent {
  // ...
}
```

**Шаблоны**

Шаблон - это ваша html-разметка, в которой вы можете описывать ваши взаимодействия с DOM на основе модели данных и событий вашего класса компонента \(в примере, контроллер MyComponent\).

```javascript
@Component({
 templateUrl: 'my.component.html'
})
export class MyComponent {

  public title: string = "Hello world";

  // ..

}
```

```markup
<!-- my.component.html -->
<p>
  Интерполяция: {{ title }},  
  или так:      {{ this.title }}
</p>
```

**Обнаружение изменений**

Каждый компонент имеет свой собственный детектор изменений, который гарантирует проверку привязок данных, определенных шаблоне.

**Внедрение зависимостей**

Внедрение зависимостей \(англ. Dependency Injection\) — это композиция структурных шаблонов проектирования, при которой за каждую функцию приложения отвечает один, условно независимый объект \(сервис\), который может иметь необходимость использовать другие объекты \(зависимости\), известные ему интерфейсами. Зависимости передаются \(внедряются\) сервису в момент его создания.

```javascript
// logger.service.ts
@Injectable()
export class LoggerService {
  // ..

  public get trace() {
    return console.debug.bind(console);
  }

}
```

```javascript
// my-component.component.ts
@Component({ /* .. */ })
export class MyComponent {

  constructor(private logger: LoggerService) {
    logger.trace('Init MyComponent');
  }

}
```

**Директивы**

Директивы позволяют получать прямой доступ к DOM ваших элементов. Они бывают двух видов: структурные и атрибутные.

Атрибутная директива:

```javascript
@Directive({
  selector: '[bold]'
})
export class BoldDirective {

    constructor(private elementRef: ElementRef){
        this.elementRef.nativeElement.style.fontWeight = "bold";
    }
}
```

Здесь внедряется сервис "ElementRef". Он представляет ссылку на элемент, к которому будет применяться директива:

```markup
<!-- my-component.component.html -->
<p bold>Hello world</p>
```

Структурные директивы:

Структурные директивы изменяют структуру DOM с помощью добавления или удаления html-элементов. Существует минимум три встроенных структурных директивы: ngIf, ngSwitch и ngFor.

```javascript
@Component({ /* ... */ })
export class AppComponent {
    // ..

    public items = ["Apple iPhone", "Huawei Mate", "Samsung Galaxy", "Motorola Moto Z"];
}
```

```markup
<!-- my-component.component.html -->
<ul>
  <li *ngFor="let item of items">{{item}}</li>
</ul>
```

**Пайпы**

Пайп \(pipe\) представляет собой особый обработчик, который позволяет форматировать отображаемые значения

```javascript
// my-component.component.ts
@Component({ /* .. */ })
export class MyComponent {
  public fields = [ { id: 1 }, { id: 2 } ];
}
```

```markup
<!-- my-component.component.html -->
Читаемый вывод объекта: 
<pre> {{ fields | json }} </pre>
```

Помимо стандартных, вы можете писать собственные

```javascript
@Pipe({ name: 'factorial' })
export class FactorialPipe implements PipeTransform {
  transform(value: number, args?: any): number {
    if (value <= 0) return 0;

    let result = 1;
    for (let i = 1; i <= value; i++) {
        result = result * i;
    }

    return result;
  }
}
```

```javascript
// my-component.component.ts
@Component({ /* .. */ })
export class MyComponent {
  public x = 5;
}
```

```markup
<!-- my-component.component.html -->
Факториал числа {{ x }} равен {{ x | factorial }}
<!-- Факториал числа 5 равен 120 -->
```

**Web Workers**

Поддержка Web Worker в Angular предназначена для упрощенного распараллеливания в вашем приложении. Когда ваше приложение запускается, Angular проводит всю основную работу по обработке вашей логики в отдельных потоках, ядро выполняет вычисление в своем рабочем потоке, в то время как другие функции могут и вовсе выполняться не в потоках.

**HTTP**

Самый распространенный способ получить данные от web-служб — это через HttpClient сервис, доступный для внедрения зависимостей в ваших компонентах. Angular HttpClient довольно прост. Все, что нам нужно сделать, это вызвать метода get и передать ему url. Данный метод get возвращает объект Observable. Этот класс является частью библиотеки rxjs, которая используется во многих местах Angular'а.

```javascript
// rest.service.ts
@Injectable()
export class RestService {

  constructor(private httpClient: HttpClient) {}

  public getByObservable(url: string): Observable<any> {
      return this.httpClient.get(url);
  }

  public getByPromise(url: string): Promise<any> {
      return this.httpClient.get(url).toPromise();
  }

}
```

Подобно обещанию \(Promise\), наблюдатель \(Observable\) не содержит в себе сразу значения. Вместо этого у него есть метод подписки\(subscribe\), где мы можем зарегистрировать обратный вызов\(callback\). Этот callback вызывается, как только результат будет доступен. Помимо обещания, Observable может вернуть более одного значения. Вы можете вернуть себе поток результатов. Но это не имеет значения в данном случае. В нашем случае Observable возвращает только одно значение.

```javascript
// my-component.component.ts
@Component({ /* .. */ })
export class MyComponent {

  constructor(private rest: RestService) {}

  // Observable classic examples
  public getFields() {
    this.rest.getByObservable('http://anyurl.com').subscibe(value =>{
      // value - результат
    },
    error => {
      // error - объект ошибки
    });
  }

  // Promise classic examples
  public async getAsyncField() {
    try {
      // value - результат
      const value = await this.rest.getByPromise('http://anyurl.com');
    } catch (error) {
      // error - объект ошибки
    }
  }

}
```
