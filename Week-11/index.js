const sidebar = document.querySelector('.sidebar');
const sidebarToggleButton = document.querySelector('.sidebar-toggle-button');

sidebarToggleButton.addEventListener('click', function () {
  if (sidebar.classList.contains('collapsed')) {
    sidebar.classList.remove('collapsed');
  } else {
    sidebar.classList.add('collapsed');
  }
});

let tabTriggerButtons = document.querySelector('.tabs-trigger');

const allTabPanels = document.querySelectorAll(`[data-tab-content]`);

const onTabTriggerButtonClicked = function (event) {
  const currentButton = event.target;

  for (let i = 0; i < tabTriggerButtons.length; i++) {
    const button = tabTriggerButtons[i];

    button.classList.remove('active');
  }

  currentButton.classList.add('active');

  const tabTarget = currentButton.getAttribute('data-tab-target');

  for (let i = 0; i < allTabPanels.length; i++) {
    let currentTab = allTabPanels[i];
    let tabContentValue = currentTab.getAttribute('data-tab-content');

    if (tabContentValue === tabTarget) {
      currentTab.classList.add('active');
    } else {
      currentTab.classList.remove('active');
    }
  }
};
