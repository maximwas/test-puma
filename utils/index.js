export const navigateTo = async (page, path) => {
  await page.goto(path);
  await page.waitForLoadState('load');
}
