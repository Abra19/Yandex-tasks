function solution(entryPoint) {
  const copy = (element, n) => {
    const list = element.parentNode;
    element.removeAttribute('x-make');
    for(let i = 1; i <= n; i += 1) {
      const el = element.cloneNode(true);
      solution(el);
      list.insertBefore(el, element)
    }
  };

  const remove = (element, n) => {
    for(let i = 1; i <= n; i += 1) {
      const el = element.nextSibling;
      if (el) {
        el.remove();
      }
    }
    element.removeAttribute('x-make')
  };

  const removeChildren = (element, n) => {
    for(let i = 1; i <= n; i += 1) {
      const child = element.firstElementChild;
      if (child) {
        element.removeChild(child);
      }
    }
    element.removeAttribute('x-make')
  };

  const switchElements = (element, n) => {
    const list = element.parentNode;
    const children = list.childNodes;
    const arr = Array.from(children);
    const index = arr.indexOf(element);
    const len = arr.length - index;
    const num = (index + n) % len + index;
    const replaced = arr[num];
    const sibling = replaced.nextSibling;
    list.insertBefore(replaced, element);
    list.insertBefore(element, sibling);
    element.removeAttribute('x-make')
  };

  const actions = {
    copy: (element, n) => copy(element, Number(n)),
    remove: (element, n) => remove(element, Number(n)),
    removeChildren: (element, n) => removeChildren(element, Number(n)),
    switch: (element, n) => switchElements(element, Number(n))
  };

  const datas = entryPoint.querySelectorAll(`${entryPoint.nodeName}>[x-make]`);

  const attrs = [];
  datas.forEach(el => {
    attrs.push(el.getAttribute('x-make'));
  })

  attrs.sort();
  if (attrs.length === 0) {
    const children = entryPoint.childNodes;
    children.forEach((el) => {
      if (el.hasChildNodes()) {
        solution(el);
      }
    })
  } else {
    attrs.forEach((el) => {
      const element = entryPoint.querySelector(`[x-make="${el}"]`);
      if (element) {
      const [action, num] = el.split(':');
      actions[action](element, num);
  
      if (element.hasChildNodes()) {
        solution(element);
      }
    }
    })
  }

  
};

solution(document.querySelector('#first'));
solution(document.querySelector('#second'));
solution(document.querySelector('#third'));
solution(document.querySelector('#forth'));