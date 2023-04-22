// на уровне модуля можно писать код, но импортироваться будет только getObserverCallback

const elemInViewport = (elem) => {
   let box = elem.getBoundingClientRect();
   let top = box.top;
   let left = box.left;
   let bottom = box.bottom;
   let right  = box.right;
   let width = document.documentElement.clientWidth;
   let height = document.documentElement.clientHeight;
   let maxWidth = right - left;
   let maxHeight = bottom - top;
   return Math.min(height, bottom) - Math.max(0, top) >= maxHeight
      && Math.min(width, right) - Math.max(0,left) >= maxWidth;
}

export function getObserverCallback(updateBreadcrumbs) {
   
  const elements = document.querySelectorAll('[data-header]');

   const viewportEls = [];
   elements.forEach(el => {
      if (elemInViewport(el)) {
        viewportEls.push(el);
      }
   })

   let [target] = viewportEls;

   if (viewportEls.length > 1) {
      let first = 0;
      for (let i = 0; i < viewportEls.length; i += 1) {
         const current = viewportEls[i];
         const next = viewportEls[i + 1];
         const currentAttr = current.dataset.header;
         const nextAttr = next.dataset.header;
         if ( nextAttr > currentAttr) {
            target = current;
         } else if (nextAttr === currentAttr && first === 0) {
            target = current;
            first = 1;
         }
         else {
            break;
         }
      }
   }

   const elementsArr = Array.from(elements);
   if (!target) {
      target = elementsArr[elements.length - 1];
   }
   
   const index = elementsArr.indexOf(target);
   let ids = [index];
   let currentId = target.id;
   for (let i = index; i >= 0; i -= 1) {
      const el = elementsArr[i];
      if (el.id < target.id && el.id !== currentId) {
         ids.push(el.id);
         currentId = el.id;
      }
   }
   updateBreadcrumbs(ids.reverse());
   
}