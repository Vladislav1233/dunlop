# Обзор проекта
Верстка официального сайта шин Dunlop.

## Веб-страницы
- [Главная](https://vladislav1233.github.io/dunlop/build/main.html "Главная")
- [Каталог](https://vladislav1233.github.io/dunlop/build/catalog.html "Каталог")
- [Карточка товара](https://vladislav1233.github.io/dunlop/build/product.html "Карточка товара")
- [Подобрать шины](https://vladislav1233.github.io/dunlop/build/how-to-moto.html "Подобрать шины")
- [Где купить](https://vladislav1233.github.io/dunlop/build/where-to-buy.html "Где купить")
- [Технологии](https://vladislav1233.github.io/dunlop/build/technology.html "Технологии")
- [Новости](https://vladislav1233.github.io/dunlop/build/news.html "Новости")
- [Контакты](https://vladislav1233.github.io/dunlop/build/contacts.html "Контакты")\
- [404](https://vladislav1233.github.io/dunlop/build/404.html "404")

## Технологии
- Pug (ex. jade) / HTML5
- Less / CSS3
- Javascript / Jquery

# Развернуть проект

## Должно быть установлено ##

node.js - https://nodejs.org/ Версию лучше последнюю скачать (выше 5.8)

npm

```bash
$ npm i npm -g —allow-root
```

bower

```bash
$ npm i bower -g —allow-root
```

gulp

```bash
$ npm i gulp -g —allow-root
```

## Настройка окружения ###

```bash
$ bower i
$ npm i
```

## Настройка jade ###

в файле /node_modules/bemto.jade/bemto.jade

с 6 по 9 строку заменить 

```
- var bemto_settings_prefix = 'b-'
- var bemto_settings_element = '__'
- var bemto_settings_modifier = '--'
- var bemto_settings_default_tag = 'div'
```

## Собираем проект ###

```bash
$ gulp build
```

## Запускаем webserver ###

```bash
$ gulp webserver
```

Запустится сервер http://localhost:3000

## Запускаем watch - он следит за вашими изменения ###

```bash
$ gulp watch
```