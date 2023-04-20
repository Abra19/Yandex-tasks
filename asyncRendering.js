const allItems = (items, num) => {
  const iter = async (arr, acc) => {
    const sorted = arr.slice(0).sort((a, b) => b.priority - a.priority);
    const len = sorted.length;
    const end = num > len ? len : num;
    const currentPart = sorted.slice(0, end);
    const rest = sorted.slice(end);
    const promises = currentPart.map(item => {
      acc.push(item.id);
      return item.render();
    });
    const resRender =  await Promise.allSettled(promises);
    const childrens = resRender.reduce((els, el) => {
      if (el.value === null) {
        return els; 
      }
      return [...els, ...el.value];
    }, []);
    const newItems = [...rest, ...childrens];
    if (newItems.length !== 0) {
      return iter(newItems, acc);
    }
    return acc;
  }
 return iter(items, []);
};


const renderAsync = (renderItems, n) => allItems(renderItems, n);
 
const renderItems = [
  {
    "id": "A",
    "priority": 1,
    "render": () => Promise.resolve(
      [
        {
          "id": "A.1",
          "priority": 2,
          "render": () => Promise.resolve(
            [
              {
                "id": "A.1.1",
                "priority": 2,
                "render": () => Promise.resolve(null),
              }
            ]
          )
        }
      ]
    )    
  },
  {
    "id": "B",
    "priority": 2,
    "render": () => Promise.resolve(
      [
        {
          "id": "B.1",
          "priority": 3,
          "render": () => Promise.resolve(null),
        },
        {
          "id": "B.2",
          "priority": 3,
          "render": () => Promise.resolve(null),
        },
        {
          "id": "B.3",
          "priority": 3,
          "render": () => Promise.resolve(null),
        },
        {
          "id": "B.4",
          "priority": 1,
          "render": () => Promise.resolve(null),
        },
        {
         "id": "B.5",
          "priority": 1,
          "render": () => Promise.resolve(null),
        },
        {
         "id": "B.6",
          "priority": 1,
          "render": () => Promise.resolve(null),
        }
      ]
    )
  }   
];

const n = 5;

renderAsync(renderItems, n).then(console.log);

//["B","A","B.1","B.2","B.3","A.1","B.4","A.1.1","B.5","B.6"]