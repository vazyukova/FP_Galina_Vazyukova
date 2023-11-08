class Project {
    #id = 0;
    #name = "";
    #lead = {};
    #tasks = [];

    constructor(id, name, lead, tasks){
        this.#id = id;
        this.#name = name;
        this.#lead = lead;
        this.#tasks = tasks;
    }

    set setName(value){
        if (value.lenght <= 0) throw new Error("Имя должно быть заполнено")
        this.name = value;
    }

    set setLead(value){
        this.#lead = value;
    }

    addTask(task){
        this.#tasks.push(task)
    }

    removeTask(taskId){
        this.#tasks.splice(taskId - 1, 1)
    }
}

class Task {
    constructor(id, name, assignee, priority){
        this.id = id;
        this.name = name;
        this.assignee = assignee;
        this.priority = priority;
    }
}

class Defect extends Task{
    constructor(id, name, assignee, priority, rootcause){
        super(id, name, assignee, priority)
        this.rootcause = rootcause;
    }
}

class Employee{
    constructor(id, name, rang){
        this.id = id;
        this.name = name;
        this.rang = rang;
    }
}

var employees = [
    new Employee(1, "Вазюкова Галина Сергеевна", "Разработчик"),
    new Employee(2, "Иванов Иван Иванович", "Бизнес аналитик"),
    new Employee(3, "Николаев Николай Николаевич", "Разработчик"),
    new Employee(4, "Сергеев Сергей Сергеевич", "Проджект менеджер"),
    new Employee(5, "Вазюкова Галина Сергеевна", "Тестировщик")
]

var newTasks = [
    new Task(1, "Сделать лабу", employees[0], "Высокий"),
    new Task(2, "Сделать тесты", employees[1], "Низкий"),
    new Task(3, "Сдать лабу", employees[1], "Высокий"),
    new Task(4, "Сделать отчет", employees[2], "Средний"),
]
var newProject = new Project(1, "Тест", employees[3], newTasks);
console.log(newProject)

//add task
newProject.addTask(new Task(5, "Оформить лабу", employees[4], "Средний"))
console.log("Добавление задачи")
console.log(newProject)

//addDefect
newProject.addTask(new Defect(6, "Не работает кнопка", employees[1], "Высокий", "Потому что так нужно"))
console.log("Добавление дефекта")
console.log(newProject)

//remove task
newProject.removeTask(3)
console.log("Удаление задачи")
console.log(newProject)

//change project name
newProject.setName = "Тест1"
console.log("Меняем название проекта")
console.log(newProject)




