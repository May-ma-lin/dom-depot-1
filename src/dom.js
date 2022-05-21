window.dom = {
  // 创建节点
  create(string) {
    // 用这种创建的话，但是如果传过来的是<div><span>1</span></div>，这就处理不了
    // return document.createElement(tagName);
    // 处理上面的问题，但是这东西有问题，就是如果你传的是 td 之类的标签呢
    // const container = document.createElement('div');
    // container.innerHTML = string;
    // return container.children[0];
    const container = document.createElement('template'); // 使用template 可以接受任意元素
    container.innerHTML = string.trim(); // 过滤两边空格的文本值
    return container.content.firstChild;
  },
  // 新增弟弟
  after(node, node2) {
    // 找到这个节点的爸爸，然后调用爸爸的insertBefore方法，然后把node2插入到node的下一个节点的前面
    // 如果下一个节点是空，也是可以插入
    node.parentNode.insertBefore(node2, node.nextSibling);
  },
  // 新增哥哥
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },
  // 新增儿子
  append(parent, node) {
    parent.appendChild(node);
  },
  // 新增爸爸
  wrap(node, parent) {
    // 先把节点从这个树里面弄出来，然后把原来的位置插入新的节点
    dom.before(node, parent);
    dom.append(parent, node);
  },
  // 删除节点
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  // 删除后代
  empty(node) {
    // const { childNodes } = node;
    const array = [];
    let x = node.firstChild;
    // 因为每次你删除都会更新这个节点
    // for (let i = 0; i < childNodes.length; i++) {
    //   dom.remove(childNodes[i]);
    //   array.push(childNodes[i]);
    // }
    // 看你后面是否还有节点存在，有的话就走
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  // 读写属性
  attr(node, name, value) {
    // 重载
    if (arguments.length === 3) {
      node.setAttribute(name, value);
    } else {
      return node.getAttribute(name);
    }
  },
  // 读写文本
  test(node, string) {
    // 重载
    if (arguments.length === 2) {
      // 适配
      if ('innerText' in node) {
        node.innerHTML = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ('innerText' in node) {
        return node.innerHTML;
      } else {
        return node.textContent;
      }
    }
  },
  html(node, string) {
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div, 'color', 'red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === 'string') {
        // dom.style(div, 'color')
        return node.style[name];
      } else if (name instanceof Object) {
        // dom.style(div, {color: 'red'})
        const object = name;
        for (let key in object) {
          // key: object / color
          node.style[key] = object[key];
        }
      }
    }
  },
  class: {
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  next(node) {
    let x = node.nextSibling;
    // 如果是文本
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) fn.call(null, nodeList[i]);
  },
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
