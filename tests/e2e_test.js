const puppeteer = require('puppeteer')
const expect = require('chai').expect
const helpers = require('../lib/helpers')

describe("Automation Practice Smoke Test", () => {

    let browser
    let page

    before('setUp', async function(){
        browser = await puppeteer.launch({
            headless: false,
            slowMo:10,
            //defaultViewport: null,
            //executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
            //args:['--start-maximized' ],
            devtools:false
        })
        page = await browser.newPage()
        await page.setDefaultTimeout(60000)
        await page.setDefaultNavigationTimeout(60000)

    })

    after('tearDown', async function(){
        // await browser.close()
    })

    it("Login with Valid Credentials", async function(){
        
        // Go to the Test URL
        await page.goto('http://automationpractice.com/index.php')

        // Assert that Home Page Title is correct
        const homeTitle = await page.title()
        expect(homeTitle).to.be.a('string','My Store')

        // Click on Login Button
        await helpers.click(page, '.login')

        // Assert that Login Page Title is Correct
        const loginTitle = await page.title()
        expect(loginTitle).to.be.a('string','Login - My Store')

        // Type an valid e-mail
        await helpers.typeText(page, '#email','vanity.sadia@aceadd.com')

        // Type a valid password
        await helpers.typeText(page, '#passwd','vanity.sadia')

        // Click on Login Button
        await helpers.click(page, '#SubmitLogin')

        // Assert that Login Page Title is correct
        const accountTitle = await page.title()
        expect(accountTitle).to.be.a('string','My account - My Store')

        // Assert That Logined User Name is correct
        const userName = await helpers.getText(page, '.account > span')
        expect(userName).to.equal('vanity sadia')

        // Go to the Home Page
        await helpers.click(page, '.logo.img-responsive')
    })

    it("Select a Product", async function(){

        // Click on Dresses Category
        await helpers.click(page, '#block_top_menu > ul > li:nth-child(2) > a')

        //  Click on Summer Dresses
        await helpers.click(page, '#categories_block_left > div > ul > li.last > a')

        // Click on the first product
        await helpers.click(page, '.product-container')

        // Select Quantity=2, Color=Blue
        await helpers.click(page,'.icon-plus')
        await helpers.click(page,'#color_to_pick_list > li:nth-child(3)')

        // Click on Add to Cart
        await helpers.click(page, '.exclusive > span')
    })

    it("Pay for selected Product", async function(){
        
        // Click on the "Proceed to checkout" button span[title='Close window']
        //await helpers.click(page,'.button-container > a > span')

        await helpers.click(page,'[title=Continue shopping] span')

        // Click on the "Proceed to checkout" button on Summary Page
        await helpers.click(page,'.cart_navigation.clearfix > a > span')

        // Add comment about your order
        await helpers.typeText(page, 'textarea[class=form-control]', 'This is My First Puppeteer Project')

        // Click on the "Proceed to checkout" button on Address Page
        await helpers.click(page,'button[name=processAddress]')

        // Click on Terms of service box 
        await helpers.click(page,'#cgv')

        // Click on the "Proceed to checkout" button on Shipping Page
        await helpers.click(page,'button[name=processCarrier]')

        // Click on "Pay by bank wire"
        await helpers.click(page,'.bankwire')

        // Click on "I confirm my order" button
        await helpers.click(page, '#cart_navigation > button > span')

        // Check "Your order on My Store is complete." message appear
        const orderCompleteMessage = await helpers.getText(page,'.cheque-indent > strong')
        expect(orderCompleteMessage).to.equal('Your order on My Store is complete.')
    })
})

