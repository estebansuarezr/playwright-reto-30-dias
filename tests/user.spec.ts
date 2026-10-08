import {test, expect} from '@playwright/test';
import { LoginPage } from '../pageobjects/LoginPage';
import { MenuOptions, SidePanel } from '../components/SidePanel';
import { TopBarMenu } from '../components/top-bar-menu/TopBarMenu';

test('Get all the usernames registered', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.doLoginAsAdmin();
   
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    await page.getByRole('link', { name: 'Admin' }).click();

    /*await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click();
    await page.getByRole('menuitem', { name: 'Users' }).click();
    */
    const rows = page.getByRole('table').getByRole('row');
    const usernames: string[] = [];

    for (let i = 1; i < await rows.count(); i++) {
        
        const usernameCell = rows.nth(i).getByRole('cell').nth(1);
        const username = await usernameCell.textContent();
        if (username) usernames.push(username.trim());
    }

    console.log(usernames);

});


test('Get all the Employed names registered', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.doLoginAsAdmin();
   
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click();
    await page.getByRole('menuitem', { name: 'Users' }).click();

    const rows = page.getByRole('table').getByRole('row');
    const employedNames: string[] = [];

    for (let i = 1; i < await rows.count(); i++) {
        
        const employedNameCell = rows.nth(i).getByRole('cell').nth(3);
        const employedName = await employedNameCell.textContent();
        
        console.log(`Row ${i}: Employed Name: ${employedName}`);
        
        if (employedName) employedNames.push(employedName.trim());
    }

    console.log(employedNames);

});



test('Select a specific user', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.doLoginAsAdmin();
   
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();

    await page.getByRole('link', { name: 'Admin' }).click();
    await page.getByRole('navigation', { name: 'Topbar Menu' }).getByText('User Management').click();
    await page.getByRole('menuitem', { name: 'Users' }).click();

    await page.getByRole('table').waitFor();

    const rows = page.getByRole('table').getByRole('row');
    const usernames: string[] = [];

    for (let i = 1; i < await rows.count(); i++) {
        
        const usernameCell = rows.nth(i).getByRole('cell').nth(1);
        const username = await usernameCell.textContent();
        if (username) usernames.push(username.trim());
    }

    console.log(usernames);

    expect(usernames.length).toBeGreaterThan(0);
    
    const username = usernames[Math.floor(Math.random() * usernames.length)];
    console.log(`Selected username: ${username}`);

    const selectedRow = rows.filter({ has: page.getByRole('cell', { name: username, exact: true }) });
    const editButton = selectedRow.getByRole('button').filter({ has: page.locator('i.bi-pencil-fill') });

    await editButton.click();

    const usernameInput = page
        .locator("//label[[text()='Username']]/ancestor::div[contains(@class,'oxd-input-group')]")
        .locator('input');
    
    await expect(usernameInput).toHaveValue(username);

});

test('Check all roles options', async ({ page }) => {
    

    const userRoleOptionsExpected = [ '-- Select --', 'Admin', 'ESS'];

    const loginPage = new LoginPage(page);
    await loginPage.doLoginAsAdmin();
    
    const sidePanel = new SidePanel(page);
    await sidePanel.clickMenuOption(MenuOptions.Admin);

    const topBarMenu = new TopBarMenu(page);
    await topBarMenu.userManagement.clickOnUserOption();

    await page.locator("//label[contains(.,'User Role')]/parent::div//following-sibling::div").click();
    const userRoleOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts();

    console.log(userRoleOptions);

    expect(userRoleOptions, 'The options are not correct').toEqual(userRoleOptionsExpected);

});

test('Consult all roles options', async ({ page }) => {
    

    const userRoleOptionsExpected = [ '-- Select --', 'Admin', 'ESS'];

    const loginPage = new LoginPage(page);
    await loginPage.doLoginAsAdmin();
    
    const sidePanel = new SidePanel(page);
    await sidePanel.clickMenuOption(MenuOptions.Admin);

    const topBarMenu = new TopBarMenu(page);
    await topBarMenu.userManagement.clickOnUserOption();

    await page.locator("//label[contains(.,'User Role')]/parent::div//following-sibling::div").click();
    const userRoleOptions = await page.getByRole('listbox').getByRole('option').allInnerTexts();

    console.log(userRoleOptions);

    expect(userRoleOptions, 'The options are not correct').toEqual(userRoleOptionsExpected);

});

test('Filter by user admin', async ({ page }) => {
    
    const loginPage = new LoginPage(page);
    await loginPage.doLoginAsAdmin();
    
    const sidePanel = new SidePanel(page);
    await sidePanel.clickMenuOption(MenuOptions.Admin);

    const topBarMenu = new TopBarMenu(page);
    await topBarMenu.userManagement.clickOnUserOption();


    await page.getByRole('table').waitFor();

    const rows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row');

    console.log('total rows: ', await rows.count());

    const currentAdminRows = rows.filter({
        has: page.getByRole('cell').nth(2).getByText('Admin')
    });

    const countRowsExpected = await currentAdminRows.count();

    console.log(countRowsExpected);

    await page.locator("//label[contains(.,'User Role')]/parent::div//following-sibling::div").click();
    await page.getByRole('listbox').getByRole('option',{name:'Admin'}).click();
    await page.getByRole('button', {name:'Search'}).click();

    
    await page.getByRole('table').waitFor();


    const filteredTableRows = page.getByRole('table').getByRole('rowgroup').nth(1).getByRole('row');
    
    const fileredAdminRows = filteredTableRows.filter({
        has: page.getByRole('cell').nth(2).getByText('Admin')
    });

    const countRowsFiltered = await fileredAdminRows.count();

    console.log(countRowsFiltered);

    expect(countRowsFiltered).toBe(countRowsExpected);


});


