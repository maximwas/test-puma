export const navigateTo = async (page, path) => {
  await page.goto(path);
  await page.waitForLoadState('load');
}

export const waitForPreload = () => {
  const element = document.querySelector('body [data-role="loader"]');

  return !Boolean(element);
}
