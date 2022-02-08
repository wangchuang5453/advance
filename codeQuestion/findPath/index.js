const data = [
  {
    id: '1',
    sub: [
      {
        id: '2',
        sub: [
          {
            id: '3',
            sub: null,
          },
          {
            id: '4',
            sub: [
              {
                id: '6',
                sub: null,
              }
            ]
          },
          {
            id: '5',
            sub: null,
          }
        ]
      },
    ]
  },
  {
    id: '7',
    sub: [
      {
        id: '8',
        sub: [
          {
            id: '9',
            sub: null,
          }
        ]
      }
    ]
  },
  {
    id: '10',
    sub: null,
  }
]

/**
 * 现在给定一个id，要求实现一个函数
 * 
 * 返回给定一个id，要求实现一个函数
 * 示例：
 * id = "1" => ["1"]
 * id = "9" => ["7", "8", "9"]
 * id = "100" => []
 */

function findPath(data, id) {
  if (data == null) {
    return [];
  }
  for (let i = 0, len = data.length; i < len; i++) {
    let { id: dataId, sub } = data[i];
    if (dataId !== id) {
      const subRes = findPath(sub, id);
      if (subRes.length !== 0) {
        return [dataId].concat(subRes);
      }
    } else {
      return [dataId];
    }  
  }
  return [];
}

const res = findPath(data, '1');
console.log(res);