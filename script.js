// Для каждого юзера в блоке выводим:
// Картинку юзера – свойство img
// Имя юзера – свойство name
// Возраст юзера – свойство age
// Роль юзера – свойство role.

// Если у юзера свойство courses есть, то выводим перечень пройденных курсов.
// Делаем основной класс User, в котором будет созданы метод render и renderCourses.
// Для каждой роли делаем свой класс Student, Lector, Admin, который наследует класс User.
// В классах Lector, Admin переопределяем метод renderCourses для того, что бы в нужном виде отобразить список курсов.

const roles = {
	admin: "https://cdn-icons-png.flaticon.com/512/1424/1424453.png",
	student: "https://cdn-icons-png.flaticon.com/512/1424/1424424.png",
	lector: "https://cdn-icons-png.flaticon.com/512/1424/1424450.png",
};

const gradation = {
	20: "satisfactory",
	55: "good",
	85: "very-good",
	100: "excellent",
};

const users = [
	{
		name: "Jack Smith",
		age: 23,
		img: "https://cdn-icons-png.flaticon.com/512/2922/2922522.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 20
			},
			{
				"title": "Java Enterprise",
				"mark": 100
			}
		]
	},
	{
		name: "Amal Smith",
		age: 20,
		img: "https://cdn-icons-png.flaticon.com/512/2922/2922656.png",
		role: "student"
	},
	{
		name: "Noah Smith",
		age: 43,
		img: "https://cdn-icons-png.flaticon.com/512/2922/2922661.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 50
			}
		]
	},
	{
		name: "Charlie Smith",
		age: 18,
		img:  "https://cdn-icons-png.flaticon.com/512/2922/2922688.png",
		role: "student",
		courses: [
			{
				"title": "Front-end Pro",
				"mark": 75
			},
			{
				"title": "Java Enterprise",
				"mark": 23
			}]
	},
	{
		name: "Emily Smith",
		age: 30,
		img:  "https://cdn-icons-png.flaticon.com/512/2922/2922565.png",
		role: "admin",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 10,
				"lector": "Leo Smith"
			},
			{
				"title": "Java Enterprise",
				"score": 50,
				"lector": "David Smith"
			},
			{
				"title": "QA",
				"score": 75,
				"lector": "Emilie Smith"
			}]
	},
	{
		name: "Leo Smith",
		age: 25,
		img: "https://cdn-icons-png.flaticon.com/512/2922/2922719.png",
		role: "lector",
		courses: [
			{
				"title": "Front-end Pro",
				"score": 18,
				"studentsScore": 85
			},
			{
				"title": "Java Enterprise",
				"score": 86,
				"studentsScore": 15
			}
		]
	}
]

// debugger;

let list = document.querySelector('.users');

class Person {
	constructor(params) {
		this.name = params.name
		this.age = params.age
		this.role = params.role
		this.img = params.img
		if(params.courses)
			this.courses = params.courses
	}

	renderInfo() {
		return `
			<div class="user">
				<div class="user__info">
					<div class="user__info--data">
						<img src="${this.img}" alt="${this.name}" height="50">
						<div class="user__naming">
							<p>Name: <b>${this.name}</b></p>
							<p>Age: <b>${this.age}</b></p>
						</div>
					</div>
					<div class="user__info--role ${this.role}">
						<img src="${roles[this.role]}" alt="${this.role}" height="25">
						<p>${this.role}</p>
					</div>
				</div>
				${this.courses ? this.renderCourses() : ``}
			</div>`;
	}

	renderCourses() {
		let heading = this.courses

		.map(item => {
			return `
			<p class="user__courses--course ${this.role}">
				${item.title} <span class="${rating(gradation, item.mark)}">${rating(gradation, item.mark)}</span>
			</p>`;
			}
		)
		.join('')

		return `<div class="user__courses">${heading}</div>`;
	}
}

class Student extends Person {
	constructor(params) {
		super(params)
	}
}

class Admin extends Person {
	constructor(params) {
		super(params)
	}

	renderCourses() {
		let heading = this.courses

		.map(item => {
			return `
			<div class="user__courses--course ${this.role}">
				<p>Title: <b>${item.title}</b></p>
				<p>Admin's score: <span class="${rating(gradation, item.score)}">${rating(gradation, item.score)}</span></p>
				<p>Lector: <b>${item.lector}</b></p>
			</div>`;
		})
		.join('')
		
		return `<div class="user__courses admin--info">${heading}</div>`;
	}
}

class Lector extends Person {
	constructor(params) {
		super(params);
	}

	renderCourses() {
		let heading = this.courses

		.map(item => {
			return `
			<div class="user__courses--course ${this.role}">
				<p>Title: <b>${item.title}</b></p>
				<p>Lector's score: <span class="${rating(gradation, item.score)}">${rating(gradation, item.score)}</span></p>
				<p>Average student's score: <span class="${rating(gradation, item.studentsScore)}">${rating(gradation, item.studentsScore)}</span></p>
			</div>`;
		})
		.join('')
		
		return `<div class="user__courses admin--info">${heading}</div>`;
	}
}

const position = {
	"student": user => new Student(user),
	"admin": user => new Admin(user),
	"lector": user => new Lector(user)
}

function renderUsers(array) {
	let users = array
	
	.map(user => position[user.role] ? position[user.role](user) : new Person(user) )
	.map(user => user)
	.map(user => user.renderInfo())
	.join(``);
		
	list.innerHTML = users;
}

renderUsers(users);

function rating(scale, mark) {
	let grade = `Grade`;

	for(let key in scale) {
		if (mark <= key) {
			grade = scale[key]
			break
		}
	}
	return grade;
};