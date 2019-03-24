// Достаем поле title, заменяем русские символы на английский и записываем это в поле url
const _db = require('libs/db'),
      SystemError = require('error/system').SystemError;





module.exports = function setURL (schema, options) {

  schema.pre('save', function (next) {

    (async () => {
      if (this.title) {
        this.url = translit(this.title);

        let fn = async () => { return await _db.find(options.name) };
        let base = await fn();

        this.url = await checkUnique(base, this.url);
      }
      next();
    })().catch((err)=> {
      if (err) { return new SystemError(500, err); }
    });


  });

};









// Транслит с русского на английский. Несколько идущих подряд спец. символов удаляет, оставляя только один.
let translit = (str) => {


  // Очищаем строку от всех символов, кроме букв, цифр и пробелов
  str = str.replace(/[^A-Za-zА-Яа-яЁё0-9-–— ]/g, "");


  let spec = '-'; // спец. символ, на который делаем замену некоторых символов


  let arr = {'а':'a', 'б':'b', 'в':'v', 'г':'g', 'д':'d', 'е':'e', 'ж':'g', 'з':'z', 'и':'i', 'й':'y', 'к':'k', 'л':'l', 'м':'m', 'н':'n', 'о':'o', 'п':'p', 'р':'r', 'с':'s', 'т':'t', 'у':'u', 'ф':'f', 'ы':'i', 'э':'e', 'А':'A', 'Б':'B', 'В':'V', 'Г':'G', 'Д':'D', 'Е':'E', 'Ж':'G', 'З':'Z', 'И':'I', 'Й':'Y', 'К':'K', 'Л':'L', 'М':'M', 'Н':'N', 'О':'O', 'П':'P', 'Р':'R', 'С':'S', 'Т':'T', 'У':'U', 'Ф':'F', 'Ы':'I', 'Э':'E', 'ё':'yo', 'х':'h', 'ц':'ts', 'ч':'ch', 'ш':'sh', 'щ':'shch', 'ъ':'', 'ь':'', 'ю':'yu', 'я':'ya', 'Ё':'YO', 'Х':'H', 'Ц':'TS', 'Ч':'CH', 'Ш':'SH', 'Щ':'SHCH', 'Ъ':'i', 'Ь':'i', 'Ю':'YU', 'Я':'YA', '-': spec, '–': spec, '—': spec, ' ': spec};


  let prev = spec;
  let replacer = function(a) {
    let current = arr[a];
    if (current === spec && prev === spec) {
      current = '';
    } else if (current || current === '') {
      prev = current;
    } else {
      current = a;
      prev = current;
    }
    return current;
  };
  str = str.replace(/[A-Za-zА-Яа-яЁё0-9-–— ]/g,replacer);


  // Если в конце строки стоит спец. символ - удаляем его
  if (str.charAt(str.length - 1) === spec) {
    str = str.slice(0, -1);
  }

  return str;
};









// Проверяем на уникальность URL. Если такой уже есть - добавляем цифру в конец и проверяем снова
let checkUnique = (db, url) => {
  return new Promise( (resolve, reject) => {

    let num = 1,
        originalURL = url;

    let check = (url) => {
      let i;
      for (i=0; i < db.length; i++) {
        if (db[i].url === url) {
          url = originalURL + "-" + num;
          num += 1;
          check(url);
          break;
        }
      }
      resolve(url);
    }
    check(url);

  });
};