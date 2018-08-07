/*
Make the Group class from the previous exercise iterable. Refer to the section about the iterator interface earlier in the chapter if you aren’t clear on the exact form of the interface anymore.

If you used an array to represent the group’s members, don’t just return the iterator created by calling the Symbol.iterator method on the array. That would work, but it defeats the purpose of this exercise.

It is okay if your iterator behaves strangely when the group is modified during iteration.
*/

class Group {
	constructor() {
		this.set = [];
	}

	add(value) {
		if(!this.has(value)) {
			this.set.push(value);
		}
	}

	delete(value) {
		this.set = this.set.filter(v => v !== value);
	}

	has(value) {
		return this.set.includes(value);
	}

	static from(collection) {
		let group = new Group;
		for(let value of collection)
			group.add(value);
		return group;
	}

	[Symbol.iterator]() {
		return new GroupIterator(this);
	}
}

class GroupIterator {
	constructor(group) {
		this.set = group.set;
		this.position = 0;
	}

	next() {
		if(this.position >= this.set.length) {
			return {done: true};
		}
		let result = {value: this.set[this.position], done: false};
		this.position++;
		return result;
	}
}



/*
for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
// → a
// → b
// → c
*/