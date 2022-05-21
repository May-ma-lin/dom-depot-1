const div = dom.create('<div>newDiv</div>');

dom.after(test, div);

const div3 = dom.create('<div id="parent"></div>');
dom.wrap(test, div3);

const nodes = dom.empty(window.empty);
console.log(nodes);

dom.attr(test, 'title', 'HI');

const title = dom.attr(test, 'title');
console.log(title);

dom.test(test, '你好，我要读取');
console.log(dom.test(test));

dom.style(test, { border: '1px solid red', color: 'red' });

dom.class.add(test, 'add');
// dom.class.remove(test, 'add');
console.log(dom.class.has(test, 'add'));

const fn = () => {
  console.log('点击');
};
dom.on(test, 'click', fn);
dom.off(test, 'click', fn);

const testDiv = dom.find('#test')[0]; // 你要获取的是div，而不是数组
console.log(testDiv);
const test2 = dom.find('#test2')[0];
console.log(dom.find('.red', test2)[0]);

console.log(dom.parent(test2));

const s2 = dom.find('#i2')[0];
console.log(dom.siblings(s2));
console.log(dom.next(s2));
console.log(dom.previous(s2));

const t = dom.find('#travel')[0];
dom.each(dom.children(t), (n) => dom.style(n, 'color', 'red'));

console.log(dom.index(s2));

const div = dom.find('#test2>.red')[0];
console.log(dom.style(div, 'color', 'red'));

// 获取多个 div.red 元素
const divList = dom.find('.red');
// 遍历 divList 里的所有元素
dom.each(divList, (n) => console.log(n));
