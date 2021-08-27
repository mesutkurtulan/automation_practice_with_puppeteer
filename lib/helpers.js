module.exports = {
    click : async function(page, selector){
        try {
            await page.waitForSelector(selector)
            await page.click(selector)
        } catch (error) {
            throw new Error('Could not click on selector: ${selector}')
        }
    },

    getText : async function(page, selector){
        try {
            await page.waitForSelector(selector)
            return await page.$eval(selector, element => element.innerHTML)
        } catch (error) {
            throw new Error('Could not get text from selector: ${selector}')
        }
    },

    getCount : async function(page, selector){
        try {
            await page.waitForSelector(selector)
            return await page.$$eval(selector, element => element.length)
        } catch (error) {
            throw new Error('Could not get count of selector: ${selector}')
        }
    },

    typeText : async function(page, selector, text){
        try {
            await page.waitForSelector(selector)
            await page.type(selector, text)
        } catch (error) {
            throw new Error('Could not type ${text} to ${selector}')
        }
    },

    select : async function(page, selector, text){
        try {
            await page.waitForSelector(selector)
            await page.select(selector, text)
        } catch (error) {
            throw new Error('Could not select ${text} to ${selector}')
        }
    }
}