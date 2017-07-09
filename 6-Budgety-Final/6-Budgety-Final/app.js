// **MODEL - BUDGET CONTROLLER - MODULE 1**
var budgetController = (function() {
    // **self invoked anonymous function object olarak düşünülmemeli**
    
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1; /*-1 because not defined initially*/
        // *used for calculating individual expenses to total income as percentage*
    };
    
    // **calcpercentage method is activated after we create an expense object
    // (expense object yarattıktan sonra income object yaratınca da çağırılır).
    // with method added to prototype we calculate percentages of each expense objects**
    Expense.prototype.calcPercentage = function(totalIncome) {
        if (totalIncome > 0) { /*infinity oluşmasın diye*/
            this.percentage = Math.round((this.value / totalIncome) * 100);
            // *totalIncome yerine doğrudan data.totals.inc kullanılabilirdi*
        } else {
            this.percentage = -1;
        }
    };
    
    
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };
    
    
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
        // **not alt since type is passed as argument: data.totals.type**
    };
    
    // **each time we can aggregate a lot random vars into one data structure we should do that**
    var data = {
    // **object (of non object type), object (of object type), array 
    // (of object type) sırasının takip edilmesine dikkat**
        allItems: {
            exp: [], /*income and expense objects*/
            inc: []
        },
        totals: {
            exp: 0, /*values of income and expense objects*/
            inc: 0
        },
        budget: 0, /*differense btw income and expense values*/
        percentage: -1 /*used for calculating total expense to total income as percentage*/
        // *we set it to -1 to indicate that it doesnt exist initially
        // (aslında bir şeyi değiştirmiyor)*
    };
    
    // ***return ettiğimiz object içinde public metod ve variablelar var.
    // return ettiğimiz metodların outer functiona ait variableları 
    // ve metodları kullanmasında closure tekniğinden yararlanılıyor***
    return {
        addItem: function(type, des, val) {
            var newItem, ID;
            // **[0,1,2,3,4], next ID = 6
            // deletion sonrası [0,1,3,5,7], next ID = 8 (not 5)
            // (it wud be 5 if we said data.allItems[type].length)
            // id = last id + 1 (not, id = number of objects in array)

            // *Create new ID inside each of the inc and exp arrays. 
            // ids shud be different even to items deleted*
            if (data.allItems[type].length > 0) { /* *not alt: data.allItems.type.length* */
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else { /*ilk item için*/
                ID = 0;
            }
            
            // Create new item based on type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            
            // Push/add it into our data structure 
            // **no need for if sta since we carry common name btw array name and type**
            data.allItems[type].push(newItem);
            
            // Return the new element
            return newItem;
        },
        
        
        deleteItem: function(type, id) {
            var ids, index;
            
            // ***ids = [0 1 2] oldu ve id 1 i sildikten sonra yeni array
            // ids = [0 2] olur. bundan sonra id'si 2 olan objecti silmek isteseydik
            // ve index = id deseydik ve hedeflediğimiz id'yi silemeyecektik. 
            // bu nedenle map kullanıldı ve id'ye göre index bulundu***
            ids = data.allItems[type].map(function(current) {
                return current.id; /* **deleteItem()'ın argumenti olan id'den farklı.
                bu nedenle current[id] denmedi** */
            });

            // *alt: using foreach loop*
            // data.allItems[type].forEach(function(current) {
            //     ids.push(current.id);
            // // var ids = []; olarak declare edilmeli
            // });

            // *alt2: using for loop*
            // for (i = 0; i < data.allItems[type].length; i++) {
            //     ids.push(data.allItems[type][i].id);
            // // var ids = []; olarak declare edilmeli
            // } 

            index = ids.indexOf(id);

            if (index !== -1) { /*if index and id exists*/
                data.allItems[type].splice(index, 1);
                // we remove 1 item from the index of array (affects original array)
            }
            
        },
        
        
        // **bu fonksiyonda "data" data structure'ından yararlanılır 
        // (ki bu nedenle argument pass edilmemişti)**
        calculateBudget: function() {
            
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            // alt: data.budget = data['totals']['inc'] - data.totals.exp;
            
            // calculate the percentage of income that we spent
            if (data.totals.inc > 0) { /*income ın 0 olmasını istemiyoruz ki infinity oluşmasın*/
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else { /*expense number olup income 0 olursa*/
                data.percentage = -1;
            }            
            
        },
        
        calculatePercentages: function() {
            
            // *loops through all objects in expense array and passes total income
            // property when calling calcPercentage method belonging each of these objects*
            data.allItems.exp.forEach(function(cur) {
               cur.calcPercentage(data.totals.inc);
            });
        },
        
        
        getPercentages: function() {
            var allPerc = data.allItems.exp.map(function(cur) {
                return cur.getPercentage();
                // alt: return cur.percentage;
            });
            return allPerc; // allPerc is array with percentages
        },
        
        
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
        
        // **data structure'ı log ederek programı test ettiğimiz bu tür fonksiyonlar önem taşır
        // (log etme işlemi browserdan yapıldı)**
        testing: function() {
            console.log(data);
        }
    };
    
})();




// **VIEW - UI CONTROLLER - MODULE 2**
var UIController = (function() {
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    
    
    // **our aim by formatting is to have a decimal part with 2 numbers, to have - or + 
    // sign prepended to numbers and to have separator for numbers more than thousands.
    // each time we display a number we call this formatNumber method**
    var formatNumber = function(num, type) {
        var numSplit, int, dec, type, sign;
        /*
            + or - before number
            exactly 2 decimal points
            comma separating the thousands

            2310.4567 -> + 2,310.46
            2000 -> - 2,000.00
            */

        // input olarak negatif sayı giremediğimiz için abs() metodu gerekli değil
        num = Math.abs(num);

        num = num.toFixed(2); /*makes 2 decimal numbers*/

        numSplit = num.split('.');

        int = numSplit[0];

        if (int.length > 3 && int.length <= 6) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); 
            //input 23510, output 23,510
            //**substr() normally doesnt modify original variable, 
            //however we modified original var by assigning to itself, int**
        } else if (int.length > 6) {
            int = int.substr(0, int.length - 6) + ',' + int.substr(0, int.length - 3) + "," + int.substr(int.length - 3, 3);
        }

        dec = numSplit[1];

        type === 'exp' ? sign = '-' : sign = '+'
        return sign + ' ' + int + '.' + dec;
        // alt: return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };
    
    // called by 2 methods (that's why not within displayPercentages() method)
    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
            // *list[i]: current item/node in nodelist, i: index*
        }
    };
    
    
    return {
        getInput: function() {
            // object is the best way to return multiple variables
            return { /* *object (of non object type) - method - object (of non 
                object type) - property sırasının takip edilmesine dikkat* */
                type: document.querySelector(DOMstrings.inputType).value, // Will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
                // parseFloat() converts the string to a decimal
                // **.value input için, .textContent diğer (div vs) elementler için kullanılır**
            };
        },
        
        
        addListItem: function(obj, type) {
            var html, newHtml, element;
            
            // Create HTML string with placeholder text
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                
                // **id attr (containing both type and js id) comes in handy when we delete each item**
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // *Replace the placeholder text with some actual data,
            // the data we will receive from the object*
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        
        
        deleteListItem: function(selectorID) {
            
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
            
        },
        
        
        clearFields: function() {
            var fields, fieldsArr;
            
            // produces list (not an array that we can directly loop through)
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            // *converts the list to an array with slice method 
            // (we don't affect original nodelist and create a new array)*
            fieldsArr = Array.prototype.slice.call(fields);
            // ***since fields is not array we cannot call like so: fields.slice()
            // (ki zaten array olsaydı doğrudan forEach loopu call ederdik).
            // (ancak length, textContent gibi bazı propertyler ile forEach() gibi bazı metodlara 
            // ulaşım veya index ile nodea ulaşmak (fields[2] gibi) node da olsa doğrudan olabilir
            // çünkü nodelist objectin içinde de bazı property ve metodlar vardır)
            // (slice() is both used to return part of an array and convert objects to array).
            // with call() this kw becomes "fields" and happened to trick js that fields was an array.
            // since "Array" is function constructor for all arrays and all methods that arrays inherit 
            // from Array function constructor are in Array's prototype property we know that 
            // slice() is also attached to Array.prototype***
            
            // clears the fields
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            // **alternative with for loop:**
            // for (i = 0; i < fieldsArr.length; i++) {
            //     fieldsArr[i].value = "";
            // } 
            
            // puts cursor on description field
            fieldsArr[0].focus();
        },
        
        
        displayBudget: function(obj) {
            var type;
            obj.budget >= 0 ? type = 'inc' : type = 'exp';
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            
            // we dont wanna show percentage when it is 0 (expense=0, income=number) 
            // or -1 (expense=number, income=0 or initial -1 percentage through init() method)
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }
            
        },
        
        
        displayPercentages: function(percentages) {
            
            // nodelist (different than array)
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            
            // **nodeListForEach is a custom function that we can use on nodelists**
            nodeListForEach(fields, function(current, index) {
                
                // *percentages array'i için closure'dan yararlanıldı (?)*
                if (percentages[index] > 0) {
                    // we assign current item/node to corresponding percentage
                    // **fields nodelistinin sayısı ile percentages arrayinin 
                    // sayısının eşit olması prensibine dayanıyor**
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
            // ***alt0: directly using forEach() method***
            // fields.forEach(function(current, index) {
                
            //     // *percentages array'i için closure'dan yararlanıldı (?)*
            //     if (percentages[index] > 0) {
            //         // we assign current item/node to corresponding percentage
            //         // **fields nodelistinin sayısı ile percentages arrayinin 
            //         // sayısının eşit olması prensibine dayanıyor**
            //         current.textContent = percentages[index] + '%';
            //     } else {
            //         current.textContent = '---';
            //     }
            // });

            // ***alt1: we cud have also used the style in clearfields() method:***
            // var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            
            // fieldsArr = Array.prototype.slice.call(fields);

            // fieldsArr.forEach(function(current, index, array) {
            //     if (percentages[index] > 0) {
            //         current.textContent = percentages[index] + '%';
            //     } else {
            //         current.textContent = '---';
            //     }
            // });

            // ***alt2: using forEach() through prototype:***
            // var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);

            // Array.prototype.forEach.call(fields, function(current, index, array) {
            //     if (percentages[index] > 0) {
            //         current.textContent = percentages[index] + '%';
            //     } else {
            //         current.textContent = '---';
            //     }
            // });
            
        },
        
        
        displayMonth: function() {
            var now, months, month, year;
            
            now = new Date();
            //var christmas = new Date(2016, 11, 25);
            
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth(); /*0 indexed*/
            
            year = now.getFullYear();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },
        
        
        changedType: function() {
            
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' +
                DOMstrings.inputValue);

            nodeListForEach(fields, function(cur) {
               cur.classList.toggle('red-focus'); 
               /* **red-focus'a css'de focus pseudo class atanmış** */
            });
            
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
            
        },
        
        
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
    
})();




// **CONTROLLER - GLOBAL APP CONTROLLER - MODULE 3**
var controller = (function(budgetCtrl, UICtrl) {
    
    var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        // ***DOM variable kullanılarak UI'deki css classlarını 
        // barındıran DOMstrings objectine ulaşım sağlanmış***
        
        // **event handler/listener, callback function olan ctrlAddItem
        // fonksiyonunu, add__btn classlı butona tıklanınca call eder.
        // doğrudan yazmak yerine ctrlAddItem metodunu kullanmamızın sebebi bu  
        // fonksiyonu 2 event listenerda da 2 kere çağırmamızdan ötürü DRY prensibini uygulamak**
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        // **keyboard press edilince eventlistener/handler anonymous functionı call eder
        // keycode'dan hangi keye basıldığını ayırt ederek (enter key için kod 13) 
        // ctrlAddItem metodunu çağırırız**
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
        // **since our last event is about UI we call a method inside view
        // we are using the change event instead of click event**
    };
    
    
    var updateBudget = function() {
        // 1. Calculate the budget
        budgetCtrl.calculateBudget();
        // **datalara budgetCtrl'ün içinden ulaşıldığı için argument pass etmiyoruz**
        
        // 2. Return the budget
        // *getbudget() has different purpose than calculatebudget(), one sets data other returns data*
        var budget = budgetCtrl.getBudget();
        // **datalara budgetCtrl'ün içinden ulaşıldığı için argument pass etmiyoruz**
        
        // 3. Display the budget on the UI
        UICtrl.displayBudget(budget);
    };
    
    
    // *expense item listlerde percentage gözükmesini sağlıyor*
    var updatePercentages = function() {
        
        // 1. Calculate percentages
        budgetCtrl.calculatePercentages();
        
        // 2. Read percentages from the budget controller
        var percentages = budgetCtrl.getPercentages();
        
        // 3. Update the UI with the new percentages
        UICtrl.displayPercentages(percentages);
    };
    
    
    var ctrlAddItem = function() {
        var input, newItem;
        
        // **aşağıdaki metodların bu sıra ile çağırılması önemli**
        
        // 1. *Get the field input data from view module*
        input = UICtrl.getInput();        
        
        // **validation sağlanıyor (parseFloat() ile value'nun önceden decimal'a çevrilmesine dikkat)**
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. *Add the item to the budget controller/model module and return object*
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. *Add the item to the UI/view module*
            UICtrl.addListItem(newItem, input.type);

            // 4. *Clear the fields and relocate the cursor*
            UICtrl.clearFields();

            // 5. *Calculate and update budget in model and view module*
            updateBudget();

            // 6. *Calculate and update percentages in model and view module*
            updatePercentages();
            // **several functions are gathered in one function (updateBudget() and 
            // updatePercentages()) so that they are called when we delete item as well
            // besides adding an item.**
        }
    };
    
    
    var ctrlDeleteItem = function(event) {
        var itemID, splitID, type, ID;

        // **aşağıdaki metodların bu sıra ile çağırılması önemli**
        
        // ***event delegationdan yararlanarak list itemı sileriz.
        // (event delegationda event bubblingden yararlanarak parent elemente event handling atarız
        // ve target property ile target elemente (parent elementin childlarından biri olan) erişiriz. 
        // event delegation ile henüz dom'da bulunmayan elementlere erişim sağlamış olurken birden 
        // fazla sayıda event handling atama işinden kurtulmuş oluruz.)
        // event.target is the element where the click happens, where the event is fired.
        // parentNode dememizin sebebi çarpı işaretinin olduğu 
        // <i> elementini değil onun 4 parent üstü elementine erişim sağlamak***
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        // we are traversing the DOM
        
        // *itemID contains both item type (inc or exp) and id (js'de html'i kodlarken ona göre yazmıştık)
        // which we take advantage of now.
        // we got only 1 id on html page, thus this style of if statement*
        if (itemID) {
            
            //itemID is inc-1, exp-0 etc
            // **although itemID is a string (thus primitive), its converted to an object whenever 
            // we call a method like split() on it (same thing happens for other primitives too)**
            splitID = itemID.split('-'); /*split() doesnt modify the original method*/
            type = splitID[0];
            ID = parseInt(splitID[1]); // *int'e çevirmemize dikkat*
            
            // 1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);
            
            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemID);
            
            // 3. Update and show the new budget
            updateBudget();
            
            // 4. Calculate and update percentages
            updatePercentages();

        }
    };
    
    
    return {
        init: function() {
            console.log('Application has started.');
            UICtrl.displayMonth();
            UICtrl.displayBudget({
            // **resets the budget UI (resets html values) when we launch the application**
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };
    
})(budgetController, UIController);
// ***budgetController ve UIController argumentlerinin pass edilmesindeki
// amaç bu argumentlerin isimlerinin sonradan değişmesine karşılık flexibility sağlamak.
// budgetController ve UIController, controller fonksiyonunun içerisinde doğrudan
// kullanılsaydı isimleri değiştirmek vakit alacaktı.***

controller.init();
// **programı başlatan kod, event listenerları aktif hale getiriyor.
// (init() olmasına rağmen controller'daki self invoked anonymous function argumentleri 
// pass etmek, return etmek/log etmek, encapsulation sağlamak bakımından önem arz ediyor)
// we created init function so that we have a place to put all the code
// that is going to be executed right at the beginning when app starts**