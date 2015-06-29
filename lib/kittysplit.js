var dateFormat = require('dateformat');
var async = require('async');
var Q = require('q');
var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;

function KittySplit() {
    var allExpensesHeading = "//a[contains(.,'View all expenses')]",
        expensesHeading = "//h2[.='Expenses']",
        editExpensesHeading = "//h2[.='Edit Expense']",
        newExpenseHeading = "//h2[.='New Expense']",
        owner = 'ben';

    function createBrowser() {
        return new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    }

    function goToExpensesPage(driver) {
        driver.wait(until.elementsLocated(By.xpath(allExpensesHeading)), 1000);

        driver.findElement(By.xpath(allExpensesHeading)).click();

        driver.wait(until.elementsLocated(By.xpath(expensesHeading)), 1000);
    }
    
    function goToKittySplitFor(driver, who) {
        driver.get('http://www.kittysplit.com/test/f8fbb64a912d473896d67935ff584882-1');
        driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//h2[.='Hello!']"))), 1000);

        driver.findElement(By.xpath("//button[.='" + who + "']")).click();

        goToExpensesPage(driver);
    }

    function addPersonToLiftShare(driver, who) {
        driver.wait(until.elementsLocated(By.xpath(editExpensesHeading)), 1000);

        driver.findElement(By.xpath("//label[contains(., '" + who + "')]")).click();
        driver.findElement(By.xpath("//button[.='Save']")).click();
    }

    function addPersonToToday(driver, who) {
        var date = new Date(),
            formattedDate = dateFormat(date, 'mm/dd/yyyy');

        driver.findElement(By.xpath("//span[contains(.,'" + formattedDate + "')]/../../../div/div/a[contains(., 'Edit')]")).then(function (element) {
            element.click();
            addPersonToLiftShare(driver, who)
        }, function () {
            createExpense(driver, who, date);
        });
    }

    function createExpense(driver, who, date) {
        driver.findElement(By.xpath("//a[contains(., 'Add')]")).click();
        driver.wait(until.elementsLocated(By.xpath(newExpenseHeading)), 1000);

        driver.findElement(By.id('entry-expense-description')).sendKeys(dateFormat(date, 'dddd'));
        driver.findElement(By.id('entry-expense-amount')).sendKeys('16.00');
        driver.findElement(By.id('entry-date')).sendKeys(dateFormat(date, 'yyyy-mm-dd'));

       selectPeople(driver, who).then(function () {
           driver.findElement(By.id("entry-expense-add")).click();
           goToExpensesPage(driver);
       });
    }

    function selectPeople(driver, who) {
        var defer = Q.defer();

        driver.findElements(By.xpath("//div[@id='entry-expense-parties']/div/label")).then(function (items) {
            async.each(items, function (item, callback) {
                item.getText().then(function (text) {
                    text = text.trim();
                    if (text !== who && text !== owner) {
                        item.click().then(callback);
                    } else {
                        callback();
                    }
                });
            }, function () {
                defer.resolve();
            });
        });

        return defer.promise;
    }
    return {
        update: function (who) {
            var driver = createBrowser();

            goToKittySplitFor(driver, who);

            addPersonToToday(driver, who);

            driver.wait(until.elementsLocated(By.xpath(expensesHeading)), 1000);

            driver.quit();
        }
    };
}

module.exports = KittySplit;