var dbase = JSON.parse(localStorage.getItem("dbase")) || [];
class Controller {
	constructor(model, view, view2, view3) {
		this.model = model;
		this.view = view;
		this.view2 = view2;
		this.view3 = view3;
	}
	addData(dbase) {
		view.add.addEventListener('click', model.handler);
	}
	addList(dbase) {
		view.show.addEventListener('click', view2.show);
	}
	removeList(dbase) {
		view2.new.addEventListener('click', view2.del);
	}
	backStep() {
		view2.backBtn.addEventListener('click', view.init);
	}
	changeForm() {
		view2.new.addEventListener('click', view3.newForm);
	}
	changeBase() {
		view3.readyBtn.addEventListener('click', view3.changeBd);
	}
}
class Model {
	constructor(view, view3) {
		this.view = view;
		this.view3 = view3;
	}
	handler(event) {
		event.preventDefault();
		var account = {
			name: document.getElementById("name").value,
			surname: document.getElementById("surname").value,
			age: document.getElementById("age").value
		};
		dbase.push(account);
		var serial = JSON.stringify(dbase);
		localStorage.setItem("dbase", serial);
	}
	lastHandler(event) {
		var obj = {
			name: document.getElementById("newname").value,
			surname: document.getElementById("newsurname").value,
			age: document.getElementById("newage").value
		};
		return obj;
	}
}
class Startview {
	constructor(view2) {
		this.main = document.createElement('form');
		this.main.setAttribute('autocomplete', 'off');
		document.body.append(this.main);
		this.main.id = 'container';
		this.part1 = document.createElement('h1');
		this.main.prepend(this.part1);
		this.part1.prepend('Форма анкеты');
		this.div = document.createElement('div');
		this.div.className = 'suggest';
		this.part1.after(this.div);
		this.div.innerHTML = 'Пожалуйста, заполните форму. Обязательные поля отмечены<span>*</span>';
		this.fieldset1 = document.createElement('fieldset');
		this.div.after(this.fieldset1);
		this.legend1 = document.createElement('legend');
		this.fieldset1.prepend(this.legend1);
		this.legend1.innerText = 'Контактная информация';
		this.nameField = document.createElement('label');
		this.legend1.after(this.nameField);
		this.nameField.innerHTML = '<div>Имя<span>*</span></div> <input type="text" id="name">';
		this.surname = document.createElement('label');
		this.nameField.after(this.surname);
		this.surname.innerHTML = '<div>Фамилия</div> <input type="text" id="surname">';
		this.age = document.createElement('label');
		this.surname.after(this.age);
		this.age.innerHTML = '<div>Возраст<span>*</span></div> <input type="text" id="age">';
		this.add = document.createElement('button');
		this.fieldset1.after(this.add);
		this.add.innerText = 'Добавить';
		this.add.id = 'adder';
		this.show = document.createElement('button');
		this.add.after(this.show);
		this.show.innerText = 'Показать';
		this.show.id = 'shower';
		this.view2 = view2;
	}
	init() {
		view2.backBtn.parentNode.replaceWith(view.main);
		view.main.prepend(view.part1);
		view.part1.after(view.div);
		view.div.after(view.fieldset1);
		view.fieldset1.prepend(view.legend1);
		view.legend1.after(view.nameField);
		view.nameField.after(view.surname);
		view.surname.after(view.age);
		view.fieldset1.after(view.add);
		view.add.after(view.show);
	}
}
class MediumView {
	constructor() {
		this.new = document.createElement('div');
		this.backBtn = document.createElement('button');
		this.backBtn.innerText = 'Назад';
		this.backBtn.id = 'back';
	}
	show(event) {
		event.preventDefault();
		view.main.replaceWith(view2.new);
		for (var i = 0; i < dbase.length; i++) {
			this.surnameBlock = document.createElement('div');
			this.surnameBlock.className = 'block-surname';
			this.surnameEl = document.createElement('p');
			this.surnameEl.id = dbase[i].surname;
			this.surnameEl.innerText = dbase[i].surname;
			this.surnameEl.className = 'surname';
			this.newBtn = document.createElement('button');
			this.newBtn.id = dbase[i].surname;
			this.newBtn.innerText = 'X';
			this.newBtn.className = 'newBtn';
			this.changeBtn = document.createElement('button');
			this.changeBtn.innerText = 'Изменить';
			this.changeBtn.value = dbase[i].surname;
			this.surnameBlock.append(this.surnameEl, this.newBtn, this.changeBtn);
			view2.new.append(this.surnameBlock, view2.backBtn);
		}
	}
	del(event) {
		let target = event.target;
		if (target.tagName === "BUTTON") {
			var idsur = event.target.id;
			for (var j = 0; j < dbase.length; j++) {
				if (idsur === dbase[j].surname) {
					dbase.splice(dbase[j].surname, 1);
					event.target.parentNode.remove();
					var serial = JSON.stringify(dbase);
					localStorage.setItem("dbase", serial);
				}
			}
		} else {
			return;
		}
	}
}
class ViewChange {
	constructor(view2, model) {
		this.commonNew = document.createElement('form');
		this.commonNew.setAttribute('autocomplete', 'off');
		this.divName = document.createElement('div');
		this.divName.innerHTML = '<div>Имя<span>*</span></div> <input type="text" id="newname">';
		this.divSurname = document.createElement('div');
		this.divSurname.innerHTML = '<div>Фамилия</div> <input type="text" id="newsurname">';
		this.divAge = document.createElement('div');
		this.divAge.innerHTML = '<div>Возраст<span>*</span></div> <input type="text" id="newage">';
		this.readyBtn = document.createElement('button');
		this.readyBtn.innerText = 'Готово';
		this.view2 = view2;
		this.model = model;
	}
	newForm(event) {
		let target = event.target;
		var tarValue = event.target.value;
		let text = event.target.innerText;
		if ((target.tagName === "BUTTON") && (text === 'Изменить')) {
			view3.readyBtn.value = event.target.value;
			view3.commonNew.prepend(view3.divName, view3.divSurname, view3.divAge, view3.readyBtn);
			view2.new.replaceWith(view3.commonNew);
		} else {
			return;
		}
	}
	changeBd(event) {
		event.preventDefault();
		var obj = model.lastHandler();
		var newVal = view3.readyBtn.value;
		for (var k = 0; k < dbase.length; k++) {
			if (newVal === dbase[k].surname) {
				var index = dbase.indexOf(dbase[k]);
				dbase.splice(index, 1, obj);
				console.log(dbase);
			}
		}
		var serial = JSON.stringify(dbase);
		localStorage.setItem("dbase", serial);
	}
}
const view3 = new ViewChange();
const view = new Startview();
const model = new Model();
const controller = new Controller();
controller.addData(dbase);
const view2 = new MediumView();
controller.addList(dbase);
controller.removeList(dbase);
controller.backStep();
controller.changeForm();
controller.changeBase(dbase);