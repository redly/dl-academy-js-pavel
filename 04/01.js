// developers - авторя ЯП
// name - имя автора
// work - род деятельности автора

const developers = [
    {
        index: 0,
        name: "Брендан Эйх",
        work: "специалист в области информатики, программист, технический директор"
    },
    {
        index: 2,
        name: "Джеймс Гослинг",
        work: "специалист в области информационных технологий"
    },
    {
        index: 3,
        name: "Бьёрн Страуструп",
        work: "программист"
    }
];

// data - ЯП про которые должны быть рассказы
// name - название ЯП
// year - год выпуска ЯП
// filenameExtensions -расширения файлов
// influencedBy - ЯП оказавшие влияние
// affectedBy - ЯП испытавшие влияние ЯП
// developerIndex - уникальный идентификатор автора языка программирования

const data = [
    {
        name: "JavaScript",
        year: 1995,
        filenameExtensions: "js, mjs",
        influencedBy: ["AWK", "C", "HyperTalk", "Java", "Lua", "Perl", "Python", "Scheme", "Self"],
        affectedBy: ["ActionScript", "AtScript", "CoffeeScript", "Dart", "JScript .NET", "LiveScript", "Objective-J", "Opa", "QML", "Raku", "TypeScript"],
        developerIndex: 0,
    },
    {
        name: "Java",
        year: 1995,
        filenameExtensions: "java, class, jar, jad, jmod",
        influencedBy: ["C++", "Си", "Ада", "Simula 67", "Smalltalk", "Objective-C", "Object Pascal", "Оберон", "Eiffel", "Модула-3", "Mesa", "Симула", "C#", "UCSD Pascal"],
        affectedBy: ["Ada 2005", "BeanShell", "C#", "Chapel", "Clojure", "ECMAScript", "Fantom", "Gambas", "Groovy", "Hack", "Haxe", "J#", "Kotlin", "PHP", "Python", "Scala", "Seed7", "Vala"],
        developerIndex: 2,
    },
    {
        name: "C++",
        year: 1983,
        filenameExtensions: "cc, cpp, cxx, c, c++, h, hpp, hh, hxx, h++",
        influencedBy: ["C++", "Си", "Ада", "Simula 67", "Smalltalk", "Objective-C", "Object Pascal", "Оберон", "Eiffel", "Модула-3", "Mesa", "Симула", "C#", "UCSD Pascal"],
        affectedBy: ["Ada", "C", "Modula-2", "Simula"],
        developerIndex: 3,
    }
];

function getText(index) {
    let dataValue = data.find(item => item.developerIndex === index);
    let developersValue = developers.find(item => item.index === index);

    let filenameExtensionsStr = dataValue.filenameExtensions;
    let filenameExtensionsArr = filenameExtensionsStr.split(", ");
    filenameExtensionsArr.forEach((element, index) => filenameExtensionsArr[index] = `.${element}`);

    let affectedByArr = dataValue.affectedBy;
    function sliceArr(arr) {
        if (arr.length > 4) {
            return arr.slice(0, 4).join(", ") + " и другие языки программирования";
        } else {
            return arr.join(", ");
        };
    };

    let text = dataValue.name + " - язык программирования выпущенный в " + dataValue.year + " году.\n" + 
    "Автором языка стал " + developersValue.name + " - " + developersValue.work + ".\nФайлы программ, написанных на " +
    dataValue.name + " могут иметь расширения " + filenameExtensionsArr.join(", ") + ".\n" +
    dataValue.name + " испытал влияние " + dataValue.influencedBy.length + " языков программирования: " + dataValue.influencedBy.join(", ") + ".\n" +
    dataValue.name + " повлиял на " + sliceArr(affectedByArr) + ".";

    /*
    let text1 = `${dataValue.name} - язык программирования выпущенный в ${dataValue.year} году.
    Автором языка стал ${developersValue.name} - ${developersValue.work}.
    Файлы программ, написанных на ${dataValue.name}, могут иметь расширения ${filenameExtensionsArr.join(", ")}.
    ${dataValue.name} испытал влияние ${dataValue.influencedBy.length} языков программирования: ${dataValue.influencedBy.join(", ")}.
    ${dataValue.name} повлиял на ${sliceArr(affectedByArr)}.`;
    */

    return text;
    // return text1;
}

function logger(value1, value2, value3) {
    console.log(value1, value2, value3);
}

function counter() {
    let i = 10;
    let timerId = setInterval(function(){
        console.log(i);
        i--;
        if (i <= 0) {
            clearTimeout(timerId);
        };
    }, 1000);
}

function showText(logger) {
    alert("Информация будет выведена в консоль через 10 секунд");
    setTimeout(() => { logger(getText(0), getText(2), getText(3)); }, 11000);
    counter();
}

showText(logger);
