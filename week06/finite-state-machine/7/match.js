/* 状态机实现 kmp time o(m+n)
KMP算法就是DFA（Deterministic Finite Automaton)上简化的
以 patten 是 "ababx" 为例，需要以下步骤：

1.生成状态矩阵 
行 patten 的每个字符 
列 patten 中的不重复字符和其他字符

 		a	b	a	b	x
a		1	1	3	1	1
b		0	2	0	4	0
x		0	0	0	0	5
other	0	0	0	0	0

2.从状态矩阵中可以看到 "ababx" 需要 6 个状态机
0 开始 machines[0]
1-4 中间状态 machines[1]-machines[4]
5 结束 machines[5]

3.从以上例子推理状态机数据结构: 
{"0":machines[0],"1":machines[1],"2":machines[2],...,"n+1":machines[n + 1]}
//如果 patten 的长度是 n, 状态机数量则为 n + 1

*/

let machines = {};

function match(patten, string) {
	
	//通过 patten 生成状态机
	for (let i = patten.length -1; i >= 0; i--) {
		let c = patten.charAt(i);
		// console.log(c);
		if(i == 0) {
			console.log(i);
			let tpl = "return c === '" + c + "' ? machines[" + (i + 1) + "]:machines[0]; ";
			machines[i] = new Function("c", tpl);
			// console.log(machines[i]);
		} else if(i == patten.length - 1) {
			console.log(i);
			let tpl = "return machines[" + i + "]; ";
			machines[i] = new Function("c", tpl);
			// console.log(machines[i]);
		} else {
			console.log(i);
			let tpl = "return c === '" + c + "' ? machines[" + (i + 1) + "]:machines[" + i + "]; ";
			machines[i] = new Function("c", tpl);
			// console.log(machines[i]);
		}
	}
	// console.log(machines);
	let state = machines[0];
	for(let c of string) {
		console.log(c);
		state = state(c);
		// console.log(state);
	}
	
	return state === machines[patten.length - 1];
}

console.log(match("abababx", "I am ababx! hhha! abababx"));
console.log(match("ababx", "I am ababx! hhha!"));
