// на уровне модуля можно писать код, но импортироваться будет только getObserverCallback

export function getObserverCallback(updateBreadcrumbs) {
   const elements = document.querySelectorAll('[data-header');
   console.log(elements);
}
