var phantom = require('phantom');
var dateFormat = require('dateformat');
var webdriver = require('selenium-webdriver'),
    By = require('selenium-webdriver').By,
    until = require('selenium-webdriver').until;


function KittySplit() {
    var allExpensesHeading = "//a[contains(.,'View all expenses')]",
        expensesHeading = "//h2[.='Expenses']",
        editExpensesHeading = "//h2[.='Edit Expense']";

    function createBrowser() {
        return new webdriver.Builder()
            .forBrowser('firefox')
            .build();
    }

    function goToKittySplitFor(driver, who) {
        driver.get('http://www.kittysplit.com/test/f8fbb64a912d473896d67935ff584882-1');
        driver.wait(until.elementIsVisible(driver.findElement(By.xpath("//h2[.='Hello!']"))), 1000);

        driver.findElement(By.xpath("//button[.='" + who + "']")).click();


        driver.wait(until.elementsLocated({ xpath: allExpensesHeading }), 1000);

        driver.findElement(By.xpath(allExpensesHeading)).click();

        driver.wait(until.elementsLocated({ xpath: expensesHeading}), 1000);
    }

    function addPersonTo(driver, who, date) {
        driver.findElement(By.xpath("//span[contains(.,'" + date + "')]/../../../div/div/a[contains(., 'Edit')]")).click();

        driver.wait(until.elementsLocated({ xpath: editExpensesHeading}), 1000);

        driver.findElement(By.xpath("//label[contains(., '" + who + "')]")).click();
        driver.findElement(By.xpath("//button[.='Save']")).click();

    }

    return {
        update: function (who) {
            var date = new Date(),
                formattedDate = dateFormat(date, 'mm/dd/yyyy');

            var driver = createBrowser();

            goToKittySplitFor(driver, who);

            addPersonTo(driver, who, formattedDate);

            driver.wait(until.elementsLocated({ xpath: expensesHeading}), 1000);

            driver.quit();
        }
    };
}


module.exports = KittySplit;