import {test, expect} from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { TopBarMenu } from '../components/top-bar-menu/TopBarMenu';
import { MenuOptions, SidePanel } from '../components/SidePanel';


test('Validate each left navigation option', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.doLoginAsAdmin();
   
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();


    const expectedMenuOptions = [
        'Admin',
        'PIM',
        'Leave',
        'Time',
        'Recruitment',
        'My Info',
        'Performance',
        'Dashboard',
        'Directory',
        'Maintenance',
        'Claim',
        'Buzz'
    ];

    const rows = page.getByLabel('Sidepanel').getByRole('listitem');
    const countRows = await rows.count();
    const menuOptions: string[] = [];

    for (let i = 0; i < countRows; i++) {
        
        const optionText = await rows.nth(i).innerText();
        if (optionText) menuOptions.push(optionText.trim());
    
    }

    console.log(menuOptions);

    expect(menuOptions).toEqual(expectedMenuOptions);

});


test('Validate the left menu navigation', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.doLoginAsAdmin();
   
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    const rows = page.getByLabel('Sidepanel').getByRole('listitem');
    const countRows = await rows.count();

    for (let i = 0; i < countRows; i++) {
        
        const option = rows.nth(i);
        const optionText = await option.innerText();

        await option.click();

        if (optionText == 'Maintenance') {
            await page.goBack();
        }

    }

});

test('Validate options of the Qualification option', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.doLoginAsAdmin();
   
    const expectedQualificationOptions = [

        {
            menu: 'Skills',
            url: '/web/index.php/admin/viewSkills'
        },
        {
            menu: 'Education',
            url: '/web/index.php/admin/viewEducation'
        },
        {
            menu: 'Licenses',
            url: '/web/index.php/admin/viewLicenses'
        },
        {
            menu: 'Languages',
            url: '/web/index.php/admin/viewLanguages'
        },
        {
            menu: 'Memberships',
            url: '/web/index.php/admin/membership'
        }
    ]

        await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
        await page.getByRole('link', { name: 'Admin' }).click();
        await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Qualifications').click();

        const qualificationOptions = page.getByRole('menu').locator('li');

    for (let option of expectedQualificationOptions) {

        const menuOption = qualificationOptions.filter({ hasText: option.menu });
        
        await menuOption.click();
        
        await expect(page).toHaveURL(new RegExp(option.url));

        await expect(page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Qualifications')).toBeVisible();

        await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('Qualifications').click();

    }

});

test('Testing topbar menu', async ({ page }) => {

    const loginPage = new LoginPage(page);
    await loginPage.doLoginAsAdmin();

    const sidePanel = new SidePanel(page);
    await sidePanel.clickMenuOption(MenuOptions.Admin)

    //await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click();

    const topBarMenu = new TopBarMenu(page);
    await topBarMenu.userManagement.clickOnUserOption();
    await topBarMenu.job.clickOnJobTitles();
    await topBarMenu.job.clickOnPayGrades();

});