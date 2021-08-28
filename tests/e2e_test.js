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
        await page.setDefaultTimeout(90000)
        await page.setDefaultNavigationTimeout(90000)

    })

    after('tearDown', async function(){
        await browser.close()
    })

    it("Login with Valid Credentials", async function(){
        
        // Go to the Test URL
        await page.goto('http://automationpractice.com/index.php')

        // Assert that Home Page Title is correct
        const homePageTitle = await page.title()
        expect(homePageTitle).to.be.a('string','My Store')

        // Click on Login Button
        await helpers.click(page, '.login')

        // Assert that Login Page Title is Correct
        const loginPageTitle = await page.title()
        expect(loginPageTitle).to.be.a('string','Login - My Store')

        // Type an valid e-mail
        const userName = 'vanity.sadia@aceadd.com'
        await helpers.typeText(page, '#email', userName)

        // Type a valid password
        const password = 'vanity.sadia'
        await helpers.typeText(page, '#passwd', password)

        // Click on Login Button
        await helpers.click(page, '#SubmitLogin')

        // Assert that Login Page Title is correct
        const accountPageTitle = await page.title()
        expect(accountPageTitle).to.be.a('string','My account - My Store')

        // Assert That Logined User Name is correct
        const actualUserName = await helpers.getText(page, '.account > span')
        const expectedUserName = 'vanity sadia'
        expect(actualUserName).to.equal(expectedUserName)

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

        await page.waitForTimeout(1000)
        // Click on the "Proceed to checkout" button
        await helpers.click(page,'.button-container > a > span')

        // Click on the "Proceed to checkout" button on Summary Page
        await helpers.click(page,'.cart_navigation.clearfix > a > span')

        // Add comment about your order
        const orderComment = 'This is My First Puppeteer Project'
        await helpers.typeText(page, 'textarea[class=form-control]', orderComment)

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

